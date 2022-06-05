import {IUser} from '../../interfaces/user';
import {ICtx} from '../../interfaces/apollo';
import {
  getFollowers,
  getFollowing,
  getNotFollowing,
  isFollow,
} from '../../controllers/follow';

export const FollowQuery = {
  isFollow: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<boolean> => isFollow(ctx.req, username),

  getFollowers: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<IUser[]> => getFollowers(ctx.req, username),

  getFollowing: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<IUser[]> => getFollowing(ctx.req, username),

  getNotFollowing: async (
      parent: any,
      args: any,
      ctx: ICtx,
  ): Promise<IUser[]> => getNotFollowing(ctx.req),
};
