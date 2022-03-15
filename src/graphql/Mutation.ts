import express from 'express';

import {CreateUserInput, IUserAuth, LoginUserInput} from '../interfaces/user';

import {login, register, renewToken} from '../controllers/user';

interface ICtx {
  req: express.Request;
}

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
};
