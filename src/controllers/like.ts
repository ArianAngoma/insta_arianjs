import express from 'express';

import {validateToken} from '../helpers/jwt';
import {findUserById} from '../entities/user';
import {
  countLikeDocuments,
  createLike,
  findLike,
  removeLike,
} from '../entities/like';

export const addLike = async (
    req: express.Request,
    publicationId: string,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  await createLike({userId, publicationId});

  return true;
};

export const deleteLike = async (
    req: express.Request,
    publicationId: string,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  await removeLike({userId, publicationId});

  return true;
};

export const isLike = async (
    req: express.Request,
    publicationId: string,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const like = await findLike({userId, publicationId});
  return !!like;
};

export const countLikes = async (
    req: express.Request,
    publicationId: string,
): Promise<number> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  return await countLikeDocuments({publicationId});
};
