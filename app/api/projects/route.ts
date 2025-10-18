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

    await query("BEGIN");

    // إنشاء المشروع
    const projectRes = await query(
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
