import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      city,
      propertyType,
      propertyStage,
      budget,
      services,
      additionalInfo,
    } = body || {};

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const toEmail = process.env.SALES_TO_EMAIL || 'sales@nextlinkuae.com';
    const emailSubject = `New Project Request: ${name}${city ? ` from ${city}` : ''}`;
    const servicesList = Array.isArray(services) && services.length
      ? services.map((s: string) => `• ${s}`).join('<br/>')
      : '—';

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Start Project Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${city ? `<p><strong>City:</strong> ${city}</p>` : ''}
        ${propertyType ? `<p><strong>Property Type:</strong> ${propertyType}</p>` : ''}
        ${propertyStage ? `<p><strong>Property Stage:</strong> ${propertyStage}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <p><strong>Requested Services:</strong><br/>${servicesList}</p>
        ${additionalInfo ? `<p><strong>Additional Info:</strong><br/><span style="white-space: pre-wrap;">${additionalInfo}</span></p>` : ''}
      </div>
    `;

    await sendMail({
      to: toEmail,
      subject: emailSubject,
      html,
      replyTo: email,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your project request has been sent. We will contact you soon.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting start project form:', error);
    return NextResponse.json(
      { error: 'Failed to submit project form. Please try again.' },
      { status: 500 }
    );
  }
}

