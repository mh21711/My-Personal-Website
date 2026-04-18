import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import BookDownload from '@/models/BookDownload';

// GET: Get download count for a specific book by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('id');
    const userId = searchParams.get('userId'); // Optional: get user's download count for this book

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Sum all download counts for this book across all users
    const result = await BookDownload.aggregate([
      { $match: { bookId } },
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);

    const downloadCount = result.length > 0 ? result[0].totalDownloads : 0;

    let userDownloadCount = null;
    if (userId) {
      const userRecord = await BookDownload.findOne({ bookId, userId });
      userDownloadCount = userRecord ? userRecord.downloadCount : 0;
    }

    return NextResponse.json({ downloadCount, userDownloadCount });
  } catch (error) {
    console.error('Error fetching download count:', error);
    return NextResponse.json({ error: 'Failed to fetch download count' }, { status: 500 });
  }
}

// POST: Record a book download (requires authentication)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    const DOWNLOAD_LIMIT = 10;

    // Find or create the download record for this user-book pair
    let downloadRecord = await BookDownload.findOne({
      bookId,
      userId: session.user.id
    });

    if (!downloadRecord) {
      // Create new record if it doesn't exist
      downloadRecord = new BookDownload({
        bookId,
        userId: session.user.id,
        downloadCount: 0,
      });
    }

    // Check if user has reached the download limit
    if (downloadRecord.downloadCount >= DOWNLOAD_LIMIT) {
      return NextResponse.json(
        { error: 'Download limit reached for this book' },
        { status: 403 }
      );
    }

    // Increment the download count and update timestamp
    downloadRecord.downloadCount += 1;
    downloadRecord.lastDownloadedAt = new Date();
    await downloadRecord.save();

    // Get updated total count for the book
    const result = await BookDownload.aggregate([
      { $match: { bookId } },
      { $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }
    ]);

    const downloadCount = result.length > 0 ? result[0].totalDownloads : 0;

    return NextResponse.json({ downloadCount });
  } catch (error) {
    console.error('Error recording download:', error);
    return NextResponse.json({ error: 'Failed to record download' }, { status: 500 });
  }
}