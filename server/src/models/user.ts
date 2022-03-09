import {Schema} from 'mongoose';

import {User} from '../interfaces/user';

const UserSchema = new Schema<User>({
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
