import {ICtx} from '../../interfaces/apollo';
import {IPublication} from '../../interfaces/publication';

import {getPublications} from '../../controllers/publication';

export const PublicationQuery = {
  getPublications: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<IPublication[]> => getPublications(ctx.req, username),
};
