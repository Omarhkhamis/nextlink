import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query("SELECT * FROM projects WHERE id = $1", [
      params.id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
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
    const { title, description, long_description, location, category, image } =
      body;

    const result = await query(
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
        long_description ?? null, // ✅ إضافة/تحديث الوصف التفصيلي
        location ?? null,
        category ?? null,
        image ?? null,
        params.id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating project:", error);
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
