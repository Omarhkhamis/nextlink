import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM social_media ORDER BY display_order ASC'
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching social media:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { platform, icon_name, url, display_order } = body;

    const result = await query(
      'INSERT INTO social_media (platform, icon_name, url, display_order, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [platform, icon_name, url, display_order || 0]
    );

    return NextResponse.json({ data: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating social media:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
