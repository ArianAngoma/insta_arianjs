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
    ...publication
  } = this.toObject();
  publication.id = _id;
  return publication;
};

export default model<IPublication>('Publication', PublicationSchema);
