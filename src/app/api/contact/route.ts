import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Email from '@/models/Email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await Email.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
