import {Schema} from 'mongoose';

export interface IFollow {
  id: string;
  userId: Schema.Types.ObjectId | string;
  follow: Schema.Types.ObjectId | string;
  createdAt: string;
  updatedAt: string;
}

export type CreateFollowInput = Omit<IFollow, 'id' | 'createdAt' | 'updatedAt'>;
