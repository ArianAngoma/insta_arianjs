import {IUser} from '../../interfaces/user';
import {IComment} from '../../interfaces/comment';

import {findUserById} from '../../entities/user';

export const Comment = {
  author: async (parent: IComment): Promise<IUser | null> => {
    return await findUserById(parent.userId);
  },
};
