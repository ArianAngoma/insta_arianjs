import {Types} from 'mongoose';

export interface IFollow {
  id: string;
  userId: Types.ObjectId | string;
  follow: Types.ObjectId | string;
  createdAt: string;
  updatedAt: string;
}

export type CreateFollowInput = Omit<IFollow, 'id' | 'createdAt' | 'updatedAt'>;
