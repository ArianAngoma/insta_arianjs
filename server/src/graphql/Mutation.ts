import {CreateUserInput, IUser} from '../interfaces/user';

import {register} from '../controllers/user';

export const Mutation = {
  // User
  register: async (parent: any, {input}: { input: CreateUserInput }): Promise<IUser> => register(input),
};
