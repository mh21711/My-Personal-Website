import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import mongoose from 'mongoose';

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const num = Number((await params).id);
    if (isNaN(num)) {
      return NextResponse.json({ error: 'Invalid blogNumber' }, { status: 400 });
    }
    const blog = await Blog.findOne({ blogNumber: num });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const userId = session.user.id;
    const likes = blog.likes || [];
    const isLiked = likes.some((id: mongoose.Types.ObjectId) => id.toString() === userId);

    if (isLiked) {
      blog.likes = likes.filter((id: mongoose.Types.ObjectId) => id.toString() !== userId);
    } else {
      blog.likes.push(new mongoose.Types.ObjectId(userId));
    }

    await blog.save();

    return NextResponse.json({
      likes: blog.likes,
      count: blog.likes.length,
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}
