import {ICtx} from '../../interfaces/apollo';
import {IPublish} from '../../interfaces/publication';

import {publish} from '../../controllers/publish';

export const PublicationMutation = {
  publish: async (
      parent: any,
      {file}: { file: File },
      ctx: ICtx,
  ): Promise<IPublish> => publish(ctx.req, file),
};
