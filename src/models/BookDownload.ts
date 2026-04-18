import mongoose, { Schema, Document } from "mongoose"

export interface IBookDownload extends Document {
  bookId: string
  userId: string
  downloadCount: number
  lastDownloadedAt: Date
}

const BookDownloadSchema = new Schema<IBookDownload>({
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
  downloadCount: { type: Number, default: 0 },
  lastDownloadedAt: { type: Date, default: Date.now },
})

// Compound index to ensure unique user-book pairs
BookDownloadSchema.index({ bookId: 1, userId: 1 }, { unique: true })

export default mongoose.models.BookDownload ||
  mongoose.model<IBookDownload>("BookDownload", BookDownloadSchema)