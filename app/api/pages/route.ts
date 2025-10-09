import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM pages ORDER BY title ASC'
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
