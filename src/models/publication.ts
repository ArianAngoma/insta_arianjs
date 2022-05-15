import {model, Schema} from 'mongoose';

import {IPublication} from '../interfaces/publication';

const PublicationSchema = new Schema<IPublication>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  file: {
    type: String,
    trim: true,
    required: true,
  },
  fileType: {
    type: String,
    trim: true,
    required: true,
  },
}, {
  timestamps: true,
});

PublicationSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...follow
  } = this.toObject();
  follow.id = _id;
  return follow;
};

export default model<IPublication>('Publication', PublicationSchema);
