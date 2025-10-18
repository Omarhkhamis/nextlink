import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Ensure this route is always dynamic (no static caching on host)
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slugParam = url.searchParams.get('slug');

    if (slugParam) {
      // Try exact slug column first, then fallback to computed slug
      let projectRes: any;
      try {
        projectRes = await query(`SELECT * FROM projects WHERE slug = $1 LIMIT 1`, [slugParam]);
      } catch (_) {
        projectRes = { rows: [] };
      }
      if (!projectRes.rows?.length) {
        projectRes = await query(
          `WITH p AS (
             SELECT *,
               lower(
                 regexp_replace(
                   regexp_replace(title, '[^\\w\\s-]', '', 'g'),
                   '\\s+', '-', 'g'
                 )
               ) AS computed_slug
             FROM projects
           )
           SELECT * FROM p WHERE regexp_replace(computed_slug, '-+', '-', 'g') = $1
           LIMIT 1`,
          [slugParam]
        );
      }

      if (!projectRes.rows?.length) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      const project = projectRes.rows[0];
      const imagesRes = await query(
        `SELECT id, url, alt, position FROM project_images WHERE project_id = $1 ORDER BY position ASC, id ASC`,
        [project.id]
      );
      return NextResponse.json({ data: { ...project, images: imagesRes.rows } }, { status: 200 });
    }

    const result = await query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );
    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

type GalleryItem = {
  url: string;
  alt?: string | null;
  position?: number | null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      long_description,
      location,
      category,
      image,
      gallery,
    } = body as {
      title: string;
      description: string;
      long_description?: string | null;
      location: string;
      category: string;
      image?: string | null;
      gallery?: GalleryItem[] | null;
    };

    // Compute slug from title
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    // Ensure uniqueness (append -2, -3, ... if needed)
    let slug = baseSlug || "project";
    try {
      let suffix = 2;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const exists = await query("SELECT 1 FROM projects WHERE slug = $1 LIMIT 1", [slug]);
        if (!exists.rows.length) break;
        slug = `${baseSlug}-${suffix++}`;
      }
    } catch (_) {
      // If slug column doesn't exist yet, continue; fallback insert below will handle it
    }

    await query("BEGIN");

    // إنشاء المشروع
    // Insert with guaranteed slug (do not fallback to NULL slug)
    let projectRes;
    try {
      projectRes = await query(
        `INSERT INTO projects (title, description, long_description, location, category, image, slug, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING *`,
        [
          title,
          description,
          long_description ?? null,
          location,
          category,
          image ?? null,
          slug,
        ]
      );
    } catch (e: any) {
      // If unique violation (23505) on slug occurs despite our check, advance suffix and retry
      if (e?.code === "23505") {
        let suffix = 2;
        let retry = null as any;
        while (!retry) {
          const nextSlug = `${baseSlug}-${suffix++}`;
          const exists = await query("SELECT 1 FROM projects WHERE slug = $1 LIMIT 1", [nextSlug]);
          if (!exists.rows.length) {
            retry = await query(
              `INSERT INTO projects (title, description, long_description, location, category, image, slug, created_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
               RETURNING *`,
              [title, description, long_description ?? null, location, category, image ?? null, nextSlug]
            );
          }
        }
        projectRes = retry;
      } else {
        throw e;
      }
    }

    const project = projectRes.rows[0];
    const projectId = project.id;

    // إدخال المعرض إن وُجد
    if (Array.isArray(gallery) && gallery.length) {
      for (let i = 0; i < gallery.length; i++) {
        const g = gallery[i];
        if (!g?.url) continue;
        await query(
          `INSERT INTO project_images (project_id, url, alt, position)
           VALUES ($1, $2, $3, $4)`,
          [projectId, g.url, g.alt ?? null, g.position ?? i]
        );
      }
    }

    await query("COMMIT");

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    try {
      await query("ROLLBACK");
    } catch {}
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
