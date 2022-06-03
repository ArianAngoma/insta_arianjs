import {ICreateLike, IDeleteLike, IFindLike, ILike} from '../interfaces/like';
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

export const removeLike = async (
    data: IDeleteLike,
): Promise<ILike | null> => {
  try {
    return await Like.findOneAndDelete({...data});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findLike = async (
    data: IFindLike,
): Promise<ILike | null> => {
  try {
    return await Like.findOne({...data});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
