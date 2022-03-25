import {Schema} from 'mongoose';

export interface IFollow {
  id: string;
  idUser: Schema.Types.ObjectId;
  follow: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}
