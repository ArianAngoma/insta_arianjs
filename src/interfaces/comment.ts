import {Types} from 'mongoose';

export interface IComment {
  id: string;
  publicationId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export type ICreateCommentInput = Pick<IComment, 'publicationId' | 'comment'>

export type ICreateComment = Pick<IComment, 'publicationId' | 'userId' | 'comment'>
