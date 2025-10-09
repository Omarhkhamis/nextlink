import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM team_members ORDER BY created_at DESC'
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, image, bio } = body;

    const result = await query(
      'INSERT INTO team_members (name, position, image, bio, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, position, image, bio]
    );

    return NextResponse.json({ data: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
