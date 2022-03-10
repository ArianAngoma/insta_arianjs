import {CreateUserInput, IUser} from '../interfaces/user';

import User from '../models/user';

export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  try {
    const user = new User({...data});
    await user.save();

    return user;
  } catch (e) {
    console.log(e);
    throw new Error('Server Error');
  }
};

export const findUserByUsernameOrEmail = async ({
  email,
  username,
}: { email?: string, username?: string }): Promise<IUser | null> => User.findOne({
  $or: [
    {email},
    {username},
  ],
});
