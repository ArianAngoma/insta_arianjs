import {Types} from 'mongoose';

export interface ILike {
  id: string;
  publicationId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  createdAt: string;
  updatedAt: string;
}

export type ICreateLike = Pick<ILike, 'publicationId' | 'userId'>;
