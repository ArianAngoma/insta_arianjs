import bcryptjs from 'bcryptjs';

import {CreateUserInput, IUser} from '../interfaces/user';

import {createUser, findUserByUsernameOrEmail} from '../entities/user';

export const register = async (input: CreateUserInput): Promise<IUser> => {
  input.email = input.email.toLowerCase();
  input.username = input.username.toLowerCase();
  const {email, username} = input;

  const salt = bcryptjs.genSaltSync();
  input.password = bcryptjs.hashSync(input.password, salt);

  const user = await findUserByUsernameOrEmail({email, username});
  if (user) throw new Error('Authentication Error');

  return await createUser(input);
};
