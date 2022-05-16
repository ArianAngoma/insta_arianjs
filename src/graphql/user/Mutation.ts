import {
  CreateUserInput, IUpdateUserInput,
  IUserAuth, IUserAvatar,
  LoginUserInput,
} from '../../interfaces/user';
import {
  deleteAvatar,
  login,
  register,
  renewToken,
  updateAvatar, updateUser,
} from '../../controllers/user';
import {ICtx} from '../../interfaces/apollo';

export const UserMutation = {
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

  deleteAvatar: async (
      parent: any,
      args: unknown,
      ctx: ICtx,
  ): Promise<boolean> => deleteAvatar(ctx.req),

  updateUser: async (
      parent: any,
      {input}: { input: IUpdateUserInput },
      ctx: ICtx,
  ): Promise<boolean> => updateUser(ctx.req, input),

};
