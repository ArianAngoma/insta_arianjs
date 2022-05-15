import {Types} from 'mongoose';

export interface IPublication {
  id: string;
  userId: Types.ObjectId | string;
  file: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
}
