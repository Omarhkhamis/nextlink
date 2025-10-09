import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM services ORDER BY created_at DESC'
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, icon } = body;

    const result = await query(
      'INSERT INTO services (name, description, icon, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [name, description, icon]
    );

    return NextResponse.json({ data: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
