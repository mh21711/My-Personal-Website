import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Import books data to get the PDF URL
    const { books } = await import('@/app/books/data');
    const book = books.find(b => b.id === bookId);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Fetch the PDF from Google Drive
    const response = await fetch(book.pdfdownload, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
    }

    // Get the PDF content as array buffer
    const pdfBuffer = await response.arrayBuffer();

    // Return the PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${book.entitle}.pdf"`,
        'Content-Length': pdfBuffer.byteLength.toString(), // <--- ADD THIS LINE
        'Cache-Control': 'no-store, max-age=0', // Better for preventing stale 0kb cache
      }
    });

  } catch (error) {
    console.error('Error downloading PDF:', error);
    return NextResponse.json({ error: 'Failed to download PDF' }, { status: 500 });
  }
}