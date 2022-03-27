import {ICtx} from '../interfaces/apollo';

import {GetUserInput, IUser, SearchUserInput} from '../interfaces/user';
import {IFollow} from '../interfaces/follow';

import {getUser, search} from '../controllers/user';
import {getFollowers, isFollow} from '../controllers/follow';

export const Query = {
  // User
  getUser: async (
      parent: any,
      {id, email, username}: GetUserInput,
      ctx: ICtx,
  ): Promise<IUser> => getUser(ctx.req, {id, email, username}),

  search: async (
      parent: any,
      {query}: SearchUserInput,
      ctx: ICtx,
  ): Promise<IUser[]> => search(ctx.req, query),

  // Follow
  isFollow: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<boolean> => isFollow(ctx.req, username),

  getFollowers: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<IFollow[]> => getFollowers(ctx.req, username),
};
