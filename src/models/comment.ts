import {model, Schema} from 'mongoose';

import {IComment} from '../interfaces/comment';

const CommentSchema = new Schema<IComment>({
  publicationId: {
    type: Schema.Types.ObjectId,
    ref: 'Publication',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
}, {
  timestamps: true,
});

CommentSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...comment
  } = this.toObject();
  comment.id = _id;
  return comment;
};

export default model<IComment>('Comment', CommentSchema);
