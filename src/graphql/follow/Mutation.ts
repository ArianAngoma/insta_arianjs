import {ICtx} from '../../interfaces/apollo';
import {follow, unFollow} from '../../controllers/follow';

export const FollowMutation = {
  follow: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<boolean> => follow(ctx.req, username),

  unFollow: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<boolean> => unFollow(ctx.req, username),
};
