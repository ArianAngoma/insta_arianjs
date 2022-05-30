import express from 'express';

import {IComment, ICreateCommentInput} from '../interfaces/comment';
import {validateToken} from '../helpers/jwt';
import {findUserById} from '../entities/user';
import {createComment, findCommentsByPublicationId} from '../entities/comment';

export const addComment = async (
    req: express.Request,
    {comment, publicationId}: ICreateCommentInput,
): Promise<IComment> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  return await createComment({
    comment,
    publicationId,
    userId,
  });
};

export const getComments = async (
    req: express.Request,
    publicationId: string,
): Promise<IComment[]> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  return await findCommentsByPublicationId(publicationId);
};
