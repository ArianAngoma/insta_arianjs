import {CreateUserInput, IUserAuth, LoginUserInput} from '../interfaces/user';

import {login, register} from '../controllers/user';

export const Mutation = {
  // User
  register: async (parent: any, {input}: { input: CreateUserInput }): Promise<IUserAuth> => register(input),
  login: async (parent: any, {input}: { input: LoginUserInput }): Promise<IUserAuth> => login(input),
};
