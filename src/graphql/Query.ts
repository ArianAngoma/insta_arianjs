import {ICtx} from '../interfaces/apollo';

import {GetUserInput, IUser} from '../interfaces/user';

import {getUser} from '../controllers/user';

export const Query = {
  // User
  getUser: async (
      parent: any,
      {id, email, username}: GetUserInput,
      ctx: ICtx,
  ): Promise<IUser> => getUser(ctx.req, {id, email, username}),
};
