import {IUser} from '../../interfaces/user';
import {IPublication} from '../../interfaces/publication';
import {findUserById} from '../../entities/user';

export const Publication = {
  author: async (parent: IPublication): Promise<IUser | null> => {
    return await findUserById(parent.userId);
  },
};
