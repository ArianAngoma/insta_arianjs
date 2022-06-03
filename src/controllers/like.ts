import express from 'express';

import {validateToken} from '../helpers/jwt';
import {findUserById} from '../entities/user';
import {createLike} from '../entities/like';

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
