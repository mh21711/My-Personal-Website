"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { useLocale } from "../../context"
import { books } from "../data"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BookPage() {
  const { data: session, status } = useSession()
  const { id } = useParams()
  const router = useRouter()
  const { isRTL } = useLocale()
  const [isDownloading, setIsDownloading] = useState(false)
  const [showAuthDesc, setShowAuthDesc] = useState(false)
  const [userDownloadCount, setUserDownloadCount] = useState<number | null>(null)

  const book = books.find(b => b.id === id)

  useEffect(() => {
    if (!book) {
      router.push('/books')
    }
  }, [book, router])

  useEffect(() => {
    // Fetch user's download count for this book
    if (session?.user?.id && book) {
      fetch(`/api/books?id=${id}&userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          setUserDownloadCount(data.userDownloadCount || 0)
        })
        .catch(err => console.error('Error fetching download count:', err))
    }
  }, [session, id, book])

  const handleDownload = async () => {
    if (!session) {
      signIn('google', { callbackUrl: `/books/${id}` })
      return
    }

    if (!book) return

    setIsDownloading(true)
    try {
      // 1. Log the download activity in your database
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: id }),
      })

      if (response.ok) {
        // 2. Instead of fetching a blob, just point the browser to the API
        // This allows IDM to catch it cleanly without the 0kb ghost file
        window.location.href = `/api/books/download?bookId=${id}`;
        
        // Optional: Update UI counts
        const countResponse = await fetch(`/api/books?id=${id}&userId=${session.user.id}`)
        const countData = await countResponse.json()
        setUserDownloadCount(countData.userDownloadCount || 0)
      } else {
        const error = await response.json()
        alert(error.error || 'Download failed')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed - Check your connection')
    } finally {
      setIsDownloading(false)
    }
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <button
            onClick={() => router.push('/books')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Books
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "lg:px-12 lg:py-20 min-h-screen bg-background",
      isRTL && "rtl"
    )}>
      {/* Book Info */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto pb-10">
          <h1 className="text-3xl font-bold mb-2">
            {isRTL ? book.artitle : book.entitle}
          </h1>
          <h2 className="text-xl text-muted-foreground mb-4">
            {isRTL ? book.arauthor : book.enauthor}
          </h2>
          <button
            onClick={() => setShowAuthDesc(!showAuthDesc)}
            className="cursor-pointer flex items-center gap-2 text-lg font-medium text-foreground hover:opacity-80 transition-opacity mb-2"
          >
            {isRTL ? "وصف المؤلف" : "Author Description"}
            <span className={cn(
              'transform transition-transform duration-300',
              showAuthDesc ? 'rotate-180' : ''
            )}>
              ▼
            </span>
          </button>
          {showAuthDesc && (
            <p className="text-sm leading-relaxed">
              {isRTL ? book.arauthdesc : book.enauthdesc}
            </p>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto relative">
          <iframe src={book.pdfpreview} className="w-full h-187.5" />
          <div className="absolute w-20 h-20 bg-transparent top-2 right-2" />
        </div>
      </div>

      {/* Fixed Download Button */}
      <div className={cn(
        "fixed bottom-10",
        isRTL ? "left-10" : "right-10"
      )}>
        {session && userDownloadCount !== null && (
          <div className="mb-2 text-center text-sm text-muted-foreground">
            {isRTL ? `التحميلات: ${userDownloadCount}/10` : `Downloads: ${userDownloadCount}/10`}
          </div>
        )}
        <button
          onClick={handleDownload}
          disabled={isDownloading || status === 'loading'}
          className={cn(
            "cursor-pointer flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            isRTL && "flex-row-reverse"
          )}
        >
          <Download size={20} />
          {isDownloading
            ? (isRTL ? "جاري التحميل..." : "Downloading...")
            : (isRTL ? "تحميل" : "Download")
          }
        </button>
      </div>
    </div>
  )
}