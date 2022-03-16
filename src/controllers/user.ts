import bcryptjs from 'bcryptjs';
import express from 'express';

import {
  CreateUserInput,
  GetUserInput,
  IUser,
  IUserAuth,
  LoginUserInput,
} from '../interfaces/user';

import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdOrEmailOrUsername,
  findUserByUsernameOrEmail,
} from '../entities/user';
import {generateToken, validateToken} from '../helpers/jwt';

export const register = async (data: CreateUserInput): Promise<IUserAuth> => {
  data.email = data.email.toLowerCase();
  data.username = data.username.toLowerCase();
  const {email, username} = data;

  const salt = bcryptjs.genSaltSync();
  data.password = bcryptjs.hashSync(data.password, salt);

  let user = await findUserByUsernameOrEmail({email, username});
  if (user) throw new Error('Usuario registrado');

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
  if (!user) throw new Error('Correo no encontrado');

  const validPassword = bcryptjs.compareSync(data.password, user.password);
  if (!validPassword) throw new Error('Contraseña incorrecta');

  const token = generateToken({id: user.id});

  return {
    user,
    token,
  };
};

export const renewToken = async (req: express.Request): Promise<IUserAuth> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const token = generateToken({id: user.id});

  return {
    user,
    token,
  };
};

export const getUser = async (req: express.Request, {
  id,
  email,
  username,
}: GetUserInput): Promise<IUser> => {
  validateToken(req, true);

  const user = await findUserByIdOrEmailOrUsername({id, email, username});
  if (!user) throw new Error('Usuario no encontrado');

  return user;
};
