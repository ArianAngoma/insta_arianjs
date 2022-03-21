import {
  CreateUserInput,
  IUserAuth,
  IUserAvatar,
  LoginUserInput,
} from '../interfaces/user';
import {ICtx} from '../interfaces/apollo';

import {login, register, renewToken, updateAvatar} from '../controllers/user';

export const Mutation = {
  // User
  register: async (
      parent: any,
      {input}: { input: CreateUserInput },
  ): Promise<IUserAuth> => register(input),

  login: async (
      parent: any,
      {input}: { input: LoginUserInput },
  ): Promise<IUserAuth> => login(input),

  renewToken: async (
      parent: any,
      args: unknown,
      ctx: ICtx,
  ): Promise<IUserAuth> => renewToken(ctx.req),

  updateAvatar: async (
      parent: any,
      {file}: { file: File },
      ctx: ICtx,
  ): Promise<IUserAvatar> => updateAvatar(ctx.req, file),
};
