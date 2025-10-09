import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM settings WHERE id = 1');

    if (result.rows.length === 0) {
      return NextResponse.json({
        data: {
          id: 1,
          site_name: 'NextLink',
          logo_url: null,
          favicon_url: null,
          contact_email: null,
          contact_phone: null,
          contact_address: null
        }
      }, { status: 200 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { site_name, logo_url, favicon_url, contact_email, contact_phone, contact_address } = body;

    const result = await query(
      `UPDATE settings
       SET site_name = $1, logo_url = $2, favicon_url = $3,
           contact_email = $4, contact_phone = $5, contact_address = $6,
           updated_at = NOW()
       WHERE id = 1
       RETURNING *`,
      [site_name, logo_url, favicon_url, contact_email, contact_phone, contact_address]
    );

    if (result.rows.length === 0) {
      const insertResult = await query(
        `INSERT INTO settings (id, site_name, logo_url, favicon_url, contact_email, contact_phone, contact_address)
         VALUES (1, $1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [site_name, logo_url, favicon_url, contact_email, contact_phone, contact_address]
      );
      return NextResponse.json({ data: insertResult.rows[0] }, { status: 200 });
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
