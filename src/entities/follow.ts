import {CreateFollowInput, IFollow} from '../interfaces/follow';
import Follow from '../models/follow';

export const createFollow = async (
    data: CreateFollowInput,
): Promise<IFollow> => {
  try {
    const follow = new Follow({...data});
    await follow.save();

    return follow;
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findFollowByUserIdAndFollow = async (
    userId: string,
    followId: string,
): Promise<IFollow[] | null> => {
  try {
    return await Follow.find({userId, follow: followId});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const deleteFollowByUserIdAndFollow = async (
    userId: string,
    followId: string,
): Promise<IFollow | null> => {
  try {
    return await Follow.findOneAndDelete({userId, follow: followId});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

