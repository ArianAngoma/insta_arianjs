import bcryptjs from 'bcryptjs';

import {CreateUserInput, IUserAuth, LoginUserInput} from '../interfaces/user';

import {
  createUser,
  findUserByEmail,
  findUserByUsernameOrEmail,
} from '../entities/user';
import {generateToken} from '../helpers/jwt';

export const register = async (data: CreateUserInput): Promise<IUserAuth> => {
  data.email = data.email.toLowerCase();
  data.username = data.username.toLowerCase();
  const {email, username} = data;

  const salt = bcryptjs.genSaltSync();
  data.password = bcryptjs.hashSync(data.password, salt);

  let user = await findUserByUsernameOrEmail({email, username});
  if (user) throw new Error('Authentication Error');

  user = await createUser(data);
  const token = generateToken({id: user.id});

  return {
    user,
    token,
  };
};

export const login = async (data: LoginUserInput): Promise<IUserAuth> => {
  data.email = data.email.toLowerCase();
  const user = await findUserByEmail({email: data.email});
  if (!user) throw new Error('Auth Error');

  const validPassword = bcryptjs.compareSync(data.password, user.password);
  if (!validPassword) throw new Error('Auth Error');

  const token = generateToken({id: user.id});

  return {
    user,
    token,
  };
};
