import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendMail } from '@/lib/mailer';

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

    try {
      // Determine recipient: env override -> settings.contact_email -> fallback
      let toEmail = process.env.SALES_TO_EMAIL || 'sales@nextlinkuae.com';
      try {
        if (!process.env.SALES_TO_EMAIL) {
          const settings = await query('SELECT contact_email FROM settings WHERE id = 1');
          if (settings.rows?.[0]?.contact_email) {
            toEmail = settings.rows[0].contact_email;
          }
        }
      } catch (e) {
        // ignore settings lookup failure; default to SALES_TO_EMAIL or fallback
      }

      const emailSubject = `New Contact Message${subject ? `: ${subject}` : ''}`;
      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr />
          <p style="color:#888;">Submission ID: ${result.rows[0].id}</p>
        </div>
      `;

      await sendMail({
        to: toEmail,
        subject: emailSubject,
        html,
        replyTo: email,
      });
    } catch (mailErr) {
      console.error('Failed to send contact email:', mailErr);
      // Continue without failing the request
    }

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
