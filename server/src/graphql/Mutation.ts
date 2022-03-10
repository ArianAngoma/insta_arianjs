import {AuthenticationError} from 'apollo-server';
import bcryptjs from 'bcryptjs';

import {CreateUserInput} from '../interfaces/user';

import {createUser, findUserByUsernameOrEmail} from '../controllers/user';

export const Mutation = {
  // User
  register: async (parent: any, {input}: { input: CreateUserInput }) => {
    input.email = input.email.toLowerCase();
    input.username = input.username.toLowerCase();
    const {email, username} = input;

    const salt = bcryptjs.genSaltSync();
    input.password = bcryptjs.hashSync(input.password, salt);

    const user = await findUserByUsernameOrEmail({email, username});
    if (user) throw new AuthenticationError('Authentication Error');

    return await createUser(input);
  },
};