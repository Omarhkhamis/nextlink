import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { platform, icon_name, url, display_order } = body;

    const result = await query(
      'UPDATE social_media SET platform = $1, icon_name = $2, url = $3, display_order = $4 WHERE id = $5 RETURNING *',
      [platform, icon_name, url, display_order || 0, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Social media not found' }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating social media:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(
      'DELETE FROM social_media WHERE id = $1 RETURNING id',
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Social media not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting social media:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
