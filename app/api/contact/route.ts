import { NextResponse } from 'next/server';
// @ts-expect-error: No types for nodemailer
import nodemailer from 'nodemailer';
import {
  getRequiredEnv,
  isMissingEnvironmentVariableError,
} from '@/lib/serverEnv';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contactEmail = getRequiredEnv('CONTACT_EMAIL');
    const contactEmailPass = getRequiredEnv('CONTACT_EMAIL_PASS');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: contactEmail,
        pass: contactEmailPass,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${contactEmail}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New Enquiry: ${subject}`,
      html: `
        <h3>New Contact Enquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message || '-'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    if (isMissingEnvironmentVariableError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Email failed to send' },
      { status: 500 }
    );
  }
}
