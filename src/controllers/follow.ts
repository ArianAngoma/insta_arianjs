import express from 'express';

import {validateToken} from '../helpers/jwt';
import {findUserById, findUserByUsernameOrEmail} from '../entities/user';
import {createFollow} from '../entities/follow';

export const follow = async (
    req: express.Request,
    username: string,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const userToFollow = await findUserByUsernameOrEmail({username});
  if (!userToFollow) throw new Error('Usuario para seguir no encontrado');

  try {
    await createFollow({userId, follow: userToFollow.id});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
