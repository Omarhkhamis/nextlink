import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// تأكد أننا على Runtime Node (مفيد لمسارات أخرى قد تتعامل مع الملفات)
export const runtime = "nodejs";

type GalleryItem = {
  url: string;
  alt?: string | null;
  position?: number | null;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1) جلب المشروع
    const projectRes = await query("SELECT * FROM projects WHERE id = $1", [
      params.id,
    ]);

    if (projectRes.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 2) جلب الصور المرتبطة
    const imagesRes = await query(
      `SELECT id, url, alt, position
       FROM project_images
       WHERE project_id = $1
       ORDER BY position ASC, id ASC`,
      [params.id]
    );

    const data = { ...projectRes.rows[0], images: imagesRes.rows };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      long_description,
      location,
      category,
      image,
      gallery, // ← مصفوفة اختيارية: [{url, alt?, position?}, ...]
    }: {
      title?: string | null;
      description?: string | null;
      long_description?: string | null;
      location?: string | null;
      category?: string | null;
      image?: string | null;
      gallery?: GalleryItem[] | null;
    } = body;

    // نبدأ معاملة لضمان الاتساق بين تحديث المشروع وتحديث الصور
    await query("BEGIN");

    // 1) تحديث المشروع (COALESCE حتى لا نمس الحقول غير المرسلة)
    // If title changes, recompute slug
    const newSlug = title
      ? title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      : null;

    let projectUpdateRes;
    try {
      projectUpdateRes = await query(
        `UPDATE projects 
         SET 
           title            = COALESCE($1, title),
           description      = COALESCE($2, description),
           long_description = COALESCE($3, long_description),
           location         = COALESCE($4, location),
           category         = COALESCE($5, category),
           image            = COALESCE($6, image),
           slug             = COALESCE($7, slug)
         WHERE id = $8
         RETURNING *`,
        [
          title ?? null,
          description ?? null,
          long_description ?? null,
          location ?? null,
          category ?? null,
          image ?? null,
          newSlug,
          params.id,
        ]
      );
    } catch (e: any) {
      // Fallback when slug column doesn't exist
      projectUpdateRes = await query(
        `UPDATE projects 
         SET 
           title            = COALESCE($1, title),
           description      = COALESCE($2, description),
           long_description = COALESCE($3, long_description),
           location         = COALESCE($4, location),
           category         = COALESCE($5, category),
           image            = COALESCE($6, image)
         WHERE id = $7
         RETURNING *`,
        [
          title ?? null,
          description ?? null,
          long_description ?? null,
          location ?? null,
          category ?? null,
          image ?? null,
          params.id,
        ]
      );
    }

    if (projectUpdateRes.rows.length === 0) {
      await query("ROLLBACK");
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 2) تحديث المعرض (إن تم إرساله فقط)
    if (Array.isArray(gallery)) {
      // نحذف القديم ثم نضيف الجديد بالترتيب
      await query("DELETE FROM project_images WHERE project_id = $1", [
        params.id,
      ]);

      // إدراج جديد
      for (let i = 0; i < gallery.length; i++) {
        const g = gallery[i];
        // تجاهل العناصر بدون url
        if (!g?.url) continue;

        await query(
          `INSERT INTO project_images (project_id, url, alt, position)
           VALUES ($1, $2, $3, $4)`,
          [params.id, g.url, g.alt ?? null, g.position ?? i]
        );
      }
    }

    // 3) جلب الصور بعد التحديث لنعيد حالة موحّدة
    const imagesRes = await query(
      `SELECT id, url, alt, position
       FROM project_images
       WHERE project_id = $1
       ORDER BY position ASC, id ASC`,
      [params.id]
    );

    await query("COMMIT");

    const data = { ...projectUpdateRes.rows[0], images: imagesRes.rows };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating project:", error);
    // لو حصل خطأ أثناء المعاملة
    try {
      await query("ROLLBACK");
    } catch (rollbackErr) {
      console.error("Rollback error:", rollbackErr);
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(
      "DELETE FROM projects WHERE id = $1 RETURNING id",
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // بفضل ON DELETE CASCADE في project_images، تُحذف صور المعرض تلقائياً
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
