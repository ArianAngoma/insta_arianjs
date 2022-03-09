import {model, Schema} from 'mongoose';

import {IUser} from '../interfaces/user';

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  web: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

UserSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...user
  } = this.toObject();
  user.id = _id;
  return user;
};

export default model<IUser>('User', UserSchema);
