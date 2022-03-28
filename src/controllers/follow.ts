import express from 'express';

import {IUser} from '../interfaces/user';

import {validateToken} from '../helpers/jwt';
import {findUserById, findUserByUsernameOrEmail} from '../entities/user';
import {
  createFollow, deleteFollowByUserIdAndFollow,
  findFollowByUserIdAndFollow, findFollowsByFollowId,
} from '../entities/follow';

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

export const isFollow = async (
    req: express.Request,
    username: string,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const userToFollow = await findUserByUsernameOrEmail({username});
  if (!userToFollow) throw new Error('Usuario seguido no encontrado');

  const follow = await findFollowByUserIdAndFollow(userId, userToFollow.id);

  return !!follow?.length;
};

export const unFollow = async (
    req: express.Request,
    username: string,
): Promise<boolean> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const userToFollow = await findUserByUsernameOrEmail({username});
  if (!userToFollow) throw new Error('Usuario seguido no encontrado');

  const follow = await deleteFollowByUserIdAndFollow(userId, userToFollow.id);

  return !!follow;
};

export const getFollowers = async (
    req: express.Request,
    username: string,
): Promise<IUser[]> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const userFollower = await findUserByUsernameOrEmail({username});
  if (!userFollower) throw new Error('Usuario no encontrado');

  const followers = await findFollowsByFollowId(userFollower.id);

  const followersList = [];
  for await (const data of followers) {
    followersList.push(data.userId);
  }

  // @ts-ignore
  return followersList;
};
