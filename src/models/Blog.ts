import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IBlog extends Document {
  title: string;
  description: string;
  author: IUser['_id'];
  likes: mongoose.Types.ObjectId[];
  views: mongoose.Types.ObjectId[];
  blogNumber: number;
  pinned: boolean;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an author'],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    blogNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

// auto-increment blogNumber before saving
BlogSchema.pre<IBlog>('save', async function () {
  if (this.isNew) {
    const last = await mongoose
      .model<IBlog>('Blog')
      .findOne({}, { blogNumber: 1 })
      .sort({ blogNumber: -1 });
    this.blogNumber = last ? last.blogNumber + 1 : 1;
  }
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
