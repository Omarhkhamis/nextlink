import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
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
      // Fallback if slug column does not exist yet
      projectRes = await query(
        `INSERT INTO projects (title, description, long_description, location, category, image, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())
         RETURNING *`,
        [
          title,
          description,
          long_description ?? null,
          location,
          category,
          image ?? null,
        ]
      );
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
