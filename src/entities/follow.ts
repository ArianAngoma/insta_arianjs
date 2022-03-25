import {CreateFollowInput, IFollow} from '../interfaces/follow';
import Follow from '../models/follow';

export const createFollow = async (
    data: CreateFollowInput,
): Promise<IFollow> => {
  try {
    const follow = new Follow({...data});
    await follow.save();

    return follow;
  } catch (e) {
    console.log(e);
    throw new Error('Server Error');
  }
};
