import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET: fetch all blogs, populate author with name and image, sort by newest first (highest blogNumber first),
// return as JSON including blogNumber and views for each blog
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .populate('author', 'name image')
      .sort({ blogNumber: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // --- NEW LOGIC: Get the latest blog number ---
    const lastBlog = await Blog.findOne().sort({ blogNumber: -1 });
    const nextBlogNumber = lastBlog && lastBlog.blogNumber ? lastBlog.blogNumber + 1 : 1;
    // ---------------------------------------------

    const blog = await Blog.create({
      title,
      description,
      blogNumber: nextBlogNumber, // Assign the new number
      author: session.user.id,
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
