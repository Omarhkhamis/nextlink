import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Try exact column match first for performance; fallback to computed
    let projectRes: any;
    try {
      projectRes = await query(`SELECT * FROM projects WHERE slug = $1 LIMIT 1`, [params.slug]);
    } catch (e: any) {
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
        [params.slug]
      );
    }

    if (projectRes.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = projectRes.rows[0];
    const imagesRes = await query(
      `SELECT id, url, alt, position
       FROM project_images
       WHERE project_id = $1
       ORDER BY position ASC, id ASC`,
      [project.id]
    );

    const data = { ...project, images: imagesRes.rows };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching project by slug:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
