import express from 'express';

import {IUser} from '../interfaces/user';

import {validateToken} from '../helpers/jwt';
import {
  findUser,
  findUserById,
  findUserByUsernameOrEmail,
} from '../entities/user';
import {
  createFollow,
  deleteFollowByUserIdAndFollow,
  findFollowByUserIdAndFollow,
  findFollowingByUserId,
  findFollowsByFollowId,
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

export const getFollowing = async (
    req: express.Request,
    username: string,
): Promise<IUser[]> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const userFollowing = await findUserByUsernameOrEmail({username});
  if (!userFollowing) throw new Error('Usuario no encontrado');

  const following = await findFollowingByUserId(userFollowing.id);

  const followingList = [];
  for await (const data of following) {
    followingList.push(data.follow);
  }

  // @ts-ignore
  return followingList;
};

export const getNotFollowing = async (
    req: express.Request,
): Promise<IUser[]> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const usersList = await findUser({}, {limit: 50});

  const arrayUsers: IUser[] = [];
  for await (const item of usersList) {
    const isFind = await findFollowByUserIdAndFollow(userId, item.id);
    if (!isFind.length) {
      if (item.id.toString() !== userId.toString()) {
        arrayUsers.push(item);
      }
    }
  }
  return arrayUsers;
};
