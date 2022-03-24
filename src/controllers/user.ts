import bcryptjs from 'bcryptjs';
import express from 'express';
import {v4 as uuidv4} from 'uuid';

import {
  CreateUserInput,
  GetUserInput, IUpdateUserInput,
  IUser,
  IUserAuth, IUserAvatar,
  LoginUserInput,
} from '../interfaces/user';

import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdOrEmailOrUsername, findUserByName,
  findUserByUsernameOrEmail,
  findUserExcludingDocumentBySpecificField,
  updateUserById,
} from '../entities/user';
import {generateToken, validateToken} from '../helpers/jwt';
import {awsRemoveImage, awsUploadImage} from '../utils/aws-image';

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

export const search = async (
    req: express.Request,
    query: string,
): Promise<IUser[]> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  return await findUserByName(query);
};

export const updateAvatar = async (
    req: express.Request,
    file: any,
): Promise<IUserAvatar> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  try {
    // Removing image from s3
    if (user.avatar) {
      const imageIdArray = user.avatar.split('/');
      const imageId = imageIdArray[imageIdArray.length - 1];
      const imageName = `avatar/${imageId}`;
      await awsRemoveImage(imageName);
    }

    // console.log(file);
    const {createReadStream, mimetype} = await file;
    const extensionFile = mimetype.split('/')[1];
    const imageName = `avatar/${uuidv4()}.${extensionFile}`;
    const fileData = createReadStream();

    const result = await awsUploadImage(fileData, imageName);
    await updateUserById(userId, {avatar: result});

    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
};

export const deleteAvatar = async (req: express.Request): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  try {
    if (user.avatar) {
      const imageIdArray = user.avatar.split('/');
      const imageId = imageIdArray[imageIdArray.length - 1];
      const imageName = `avatar/${imageId}`;
      await awsRemoveImage(imageName);
    }

    await updateUserById(userId, {avatar: ''});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUser = async (
    req: express.Request,
    data: IUpdateUserInput,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  try {
    if (data.currentPassword && data.newPassword) {
      const validPassword = bcryptjs.compareSync(
          data.currentPassword,
          user.password,
      );
      if (!validPassword) throw new Error('Contraseña incorrecta');

      const salt = bcryptjs.genSaltSync();
      const newPasswordCrypt = bcryptjs.hashSync(data.newPassword, salt);

      await updateUserById(userId, {password: newPasswordCrypt});
    } else {
      const user = await findUserExcludingDocumentBySpecificField(
          {field: 'email', value: data.email},
          {field: '_id', value: userId},
      );

      if (user.length) throw new Error('Email ya registrado');

      await updateUserById(userId, {...data});
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
