import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api.error';
import { IErrorHandler } from './IErrorHandler';
import { ApiErrorHandler } from './ApiErrorHandler';
import { InternalServerErrorHandler } from './InternalServerErrorHandler';

export class ErrorHandlerContext {
  private strategy: IErrorHandler;

  constructor(err: Error | ApiError) {
    this.strategy = 'statusCode' in err ? new ApiErrorHandler() : new InternalServerErrorHandler();
  }

  handle(err: Error | ApiError, req: Request, res: Response, next: NextFunction): void {
    this.strategy.handle(err, req, res, next);
  }
}