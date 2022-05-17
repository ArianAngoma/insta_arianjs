import express from 'express';

import {IPublish} from '../interfaces/publication';

import {validateToken} from '../helpers/jwt';
import {findUserById} from '../entities/user';

export const publish = async (
    req: express.Request,
    file: any,
): Promise<IPublish> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  console.log('Executing publish');

  return {
    status: true,
    urlFile: 'Test',
  };
};
