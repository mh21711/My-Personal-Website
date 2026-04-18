import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';
import { IBlog } from './Blog';

export interface IComment extends Document {
  text: string;
  user: IUser['_id'];
  blog: IBlog['_id'];
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: [true, 'Please provide comment text'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Please provide a blog'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
