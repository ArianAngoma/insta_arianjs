import {ICtx} from '../../interfaces/apollo';
import {IComment, ICreateCommentInput} from '../../interfaces/comment';
import {addComment} from '../../controllers/comment';

export const CommentMutation = {
  addComment: async (
      parent: any,
      {input}: { input: ICreateCommentInput },
      ctx: ICtx,
  ): Promise<IComment> => addComment(ctx.req, input),
};
