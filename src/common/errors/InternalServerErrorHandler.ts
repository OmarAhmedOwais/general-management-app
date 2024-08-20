// common/errors/InternalServerErrorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from './internal.error';
import { IErrorHandler } from './IErrorHandler';
import { logger } from '@/common/utils/logger';

export class InternalServerErrorHandler implements IErrorHandler {
  handle(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    const apiError = new InternalServerError(err);

    logger.error(`${apiError.message} - ${apiError.stack}`, {
      context: 'InternalServerErrorHandler',
      stack: apiError.stack,
    });

    res.status(apiError.statusCode).json(apiError);
  }
}
