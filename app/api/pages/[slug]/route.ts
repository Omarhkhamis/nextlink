import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await query(
      'SELECT * FROM pages WHERE slug = $1',
      [params.slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching page:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { title, content, meta_description, is_published } = body;

    const result = await query(
      `UPDATE pages
       SET title = $1, content = $2, meta_description = $3, is_published = $4, updated_at = NOW()
       WHERE slug = $5
       RETURNING *`,
      [title, content, meta_description, is_published, params.slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating page:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
