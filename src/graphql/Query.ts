import {ICtx} from '../interfaces/apollo';
import {IUser} from '../interfaces/user';

import {getUser} from '../controllers/user';

export const Query = {
  // User
  getUser: async (
      parent: any,
      args: any,
      ctx: ICtx,
  ): Promise<IUser> => getUser(ctx.req),
};
