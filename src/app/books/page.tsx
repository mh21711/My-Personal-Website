"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/app/context"
import { books } from "./data"
import BookCard from "@/components/books/BookCard"
import en from "@/messages/en.json"
import ar from "@/messages/ar.json"
import { cn } from "@/lib/utils"

export default function Page() {
  const { isRTL } = useLocale()
  const [showAnswer, setShowAnswer] = useState(false)
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})

  const t = isRTL ? ar.books : en.books

  useEffect(() => {
    const fetchDownloadCounts = async () => {
      const counts: Record<string, number> = {}
      for (const book of books) {
        try {
          const response = await fetch(`/api/books?id=${book.id}`)
          if (response.ok) {
            const data = await response.json()
            counts[book.id] = data.downloadCount
          }
        } catch (error) {
          console.error(`Error fetching download count for book ${book.id}:`, error)
        }
      }
      setDownloadCounts(counts)
    }

    fetchDownloadCounts()
  }, [])

  return (
    <div className={cn(
      "min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8",
      isRTL && "rtl"
    )}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-12 text-center">
          {t.title}
        </h1>

        {/* Question/Answer Section */}
        <div className="mb-12">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="cursor-pointer flex items-center gap-2 text-xl font-heading font-bold text-foreground mb-2 hover:opacity-80 transition-opacity"
          >
            {t.question}
            <span className={cn(
              'transform transition-transform duration-300',
              showAnswer ? 'rotate-180' : ''
            )}>
              ▼
            </span>
          </button>
          {showAnswer && (
            <p className="text-sm text-muted-foreground max-w-2xl">
              {t.answer}
            </p>
          )}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={isRTL ? book.artitle : book.entitle}
              author={isRTL ? book.arauthor : book.enauthor}
              imageUrl={book.cover}
              isRTL={isRTL}
              downloadscount={downloadCounts[book.id]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}