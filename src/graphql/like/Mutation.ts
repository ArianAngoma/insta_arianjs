import {ICtx} from '../../interfaces/apollo';
import {addLike, deleteLike} from '../../controllers/like';

export const LikeMutation = {
  addLike: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<boolean> => addLike(ctx.req, publicationId),

  deleteLike: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<boolean> => deleteLike(ctx.req, publicationId),
};
