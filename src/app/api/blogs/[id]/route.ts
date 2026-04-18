import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

interface Params {
  id: string; // refers to blogNumber
}

// GET: Find a blog by blogNumber and return as JSON.
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const num = Number((await params).id);
    if (isNaN(num)) {
      return NextResponse.json({ error: 'Invalid blogNumber' }, { status: 400 });
    }

    // Just fetch the blog. The view count logic is handled at /api/blogs/[id]/view
    const blog = await Blog.findOne({ blogNumber: num })
      .populate('author', 'name image');

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PATCH: Edit a blog (Admin only)
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role?.toLowerCase() !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();

    const num = Number(params.id);
    if (isNaN(num)) {
      return NextResponse.json({ error: 'Invalid blogNumber' }, { status: 400 });
    }

    const blog = await Blog.findOneAndUpdate(
      { blogNumber: num },
      { title, description },
      { new: true }
    ).populate('author', 'name image');

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE: Delete a blog (Admin only)
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role?.toLowerCase() !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const num = Number(params.id);
    if (isNaN(num)) {
      return NextResponse.json({ error: 'Invalid blogNumber' }, { status: 400 });
    }

    const blog = await Blog.findOneAndDelete({ blogNumber: num });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}