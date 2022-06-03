import {ICtx} from '../../interfaces/apollo';
import {isLike} from '../../controllers/like';

export const LikeQuery = {
  isLike: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<boolean> => isLike(ctx.req, publicationId),
};
