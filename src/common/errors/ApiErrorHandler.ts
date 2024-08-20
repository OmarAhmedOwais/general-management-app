import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api.error';
import { IErrorHandler } from './IErrorHandler';
import { logger } from '@/common/utils/logger';

export class ApiErrorHandler implements IErrorHandler {
  handle(err: ApiError, _req: Request, res: Response, _next: NextFunction): void {
    logger.error(`${err.message} - ${err.stack}`, {
      context: 'ApiErrorHandler',
      stack: err.stack,
    });

    res.status(err.statusCode).json(err);
  }
}
