import {Types} from 'mongoose';
import {ICreatePublication, IPublication} from '../interfaces/publication';
import Publication from '../models/publication';

export const createPublication = async (
    data: ICreatePublication,
): Promise<IPublication> => {
  try {
    const publication = new Publication({...data});
    await publication.save();

    return publication;
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findPublicationsByUserId = async (
    userId: string | Types.ObjectId,
): Promise<IPublication[]> => {
  try {
    return await Publication.find({userId}).sort({createdAt: -1});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
