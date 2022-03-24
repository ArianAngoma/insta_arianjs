import {ICtx} from '../interfaces/apollo';

import {GetUserInput, IUser, SearchUserInput} from '../interfaces/user';

import {getUser, search} from '../controllers/user';

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
};
