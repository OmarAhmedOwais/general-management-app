import { BaseMiddleware } from '@/base';
import { Request, Response } from 'express';
import { NotFoundError } from '@/common/errors';
import { MessageType } from '@/data/types/enums';
import { logger } from '@/common/utils';

export class NotFoundMiddleware implements BaseMiddleware {
  execute = (req: Request, _res: Response): void => {
    const message_en = `Route not found for ${req.method} ${req.path}`;
    logger.error('Route not found', {
      method: req.method,
      path: req.path,
      message: message_en,
      type: MessageType.ERROR,
      context: 'NotFoundMiddleware',
    });
    throw new NotFoundError([{ message_en, type: MessageType.ERROR }]);
  };
}
