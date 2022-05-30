import {ICtx} from '../../interfaces/apollo';
import {IComment} from '../../interfaces/comment';

import {getComments} from '../../controllers/comment';

export const CommentQuery = {
  getComments: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<IComment[]> => getComments(ctx.req, publicationId),
};
