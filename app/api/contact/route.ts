import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'new', NOW())
       RETURNING *`,
      [name, email, phone || null, subject || null, message]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!',
        data: result.rows[0]
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
