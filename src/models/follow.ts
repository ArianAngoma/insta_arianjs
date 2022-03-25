import {model, Schema} from 'mongoose';

import {IFollow} from '../interfaces/follow';

const FollowSchema = new Schema<IFollow>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  follow: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

FollowSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...follow
  } = this.toObject();
  follow.id = _id;
  return follow;
};

export default model<IFollow>('Follow', FollowSchema);
