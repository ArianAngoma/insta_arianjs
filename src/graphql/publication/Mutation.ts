import {ICtx} from '../../interfaces/apollo';
import {IPublish} from '../../interfaces/publication';

import {publication} from '../../controllers/publication';

export const PublicationMutation = {
  publish: async (
      parent: any,
      {file}: { file: File },
      ctx: ICtx,
  ): Promise<IPublish> => publication(ctx.req, file),
};
