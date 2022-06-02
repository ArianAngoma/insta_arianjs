import {model, Schema} from 'mongoose';

import {ILike} from '../interfaces/like';

const LikeSchema = new Schema<ILike>({
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
}, {
  timestamps: true,
});

LikeSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...like
  } = this.toObject();
  like.id = _id;
  return like;
};

export default model<ILike>('Like', LikeSchema);
