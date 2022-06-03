import {ICtx} from '../../interfaces/apollo';
import {addLike} from '../../controllers/like';

export const LikeMutation = {
  addLike: async (
      parent: any,
      {publicationId}: { publicationId: string },
      ctx: ICtx,
  ): Promise<boolean> => addLike(ctx.req, publicationId),
};
