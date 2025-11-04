import nodemailer from 'nodemailer';

type SendMailOptions = {
  to?: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
};

export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error('SMTP configuration missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendMail({ to, subject, text, html, replyTo }: SendMailOptions) {
  const transporter = getTransporter();

  const fromName = process.env.SMTP_FROM_NAME || 'NextLink Website';
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'no-reply@nextlinkuae.com';
  const defaultTo = process.env.SALES_TO_EMAIL || 'sales@nextlinkuae.com';

  const mailOptions = {
    from: `${fromName} <${fromEmail}>`,
    to: to || defaultTo,
    subject,
    text,
    html,
    replyTo,
  } as any;

  return transporter.sendMail(mailOptions);
}

