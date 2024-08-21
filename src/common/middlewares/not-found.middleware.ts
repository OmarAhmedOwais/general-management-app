import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors';
import { MessageType } from '../../data/types/enums';

export const globalNotFoundMiddleware = expressAsyncHandler(
  async (req: Request, _res: Response): Promise<void> => {
    const message_en = `Route not found for ${req.method} ${req.path}`;
    throw new NotFoundError([{ message_en, type: MessageType.ERROR }]);
  },
);
