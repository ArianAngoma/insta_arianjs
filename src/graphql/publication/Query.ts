import {ICtx} from '../../interfaces/apollo';
import {IPublication} from '../../interfaces/publication';

import {
  getPublications,
  getPublicationsFollowing,
} from '../../controllers/publication';

export const PublicationQuery = {
  getPublications: async (
      parent: any,
      {username}: { username: string },
      ctx: ICtx,
  ): Promise<IPublication[]> => getPublications(ctx.req, username),

  getPublicationsFollowing: async (
      parent: any,
      args: any,
      ctx: ICtx,
  ): Promise<IPublication[]> => getPublicationsFollowing(ctx.req),
};
