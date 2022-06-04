import {ICtx} from '../../interfaces/apollo';
import {countLikes, isLike} from '../../controllers/like';

export const LikeQuery = {
  isLike: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<boolean> => isLike(ctx.req, publicationId),

  countLikes: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<number> => countLikes(ctx.req, publicationId),
};
