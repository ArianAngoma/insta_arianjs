import {ICreateLike, ILike} from '../interfaces/like';
import Like from '../models/like';

export const createLike = async (
    data: ICreateLike,
): Promise<ILike> => {
  try {
    const like = new Like({...data});
    await like.save();

    return like;
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
