import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const num = Number((await params).id);

    // 1. Basic Validation
    if (isNaN(num)) {
      return NextResponse.json({ error: 'Invalid blogNumber' }, { status: 400 });
    }

    // 2. Determine the update logic
    // We only track unique views for logged-in users. 
    // If there is no session, we skip the update to keep data clean.
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Anonymous view not tracked' }, { status: 200 });
    }

    // 3. Atomic Update
    // $addToSet adds the userId to the views array ONLY if it's not already there.
    const blog = await Blog.findOneAndUpdate(
      { blogNumber: num },
      { $addToSet: { views: session.user.id } },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      viewCount: blog.views.length,
    });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 });
  }
}