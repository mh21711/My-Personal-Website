import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Email from '@/models/Email';

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const unreadCount = await Email.countDocuments({ read: false });

    return NextResponse.json({ count: unreadCount });
  } catch (error) {
    console.error('Error fetching unread emails count:', error);
    return NextResponse.json({ error: 'Failed to fetch unread emails count' }, { status: 500 });
  }
}