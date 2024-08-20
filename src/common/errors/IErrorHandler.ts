// common/errors/IErrorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api.error';

export interface IErrorHandler {
  handle(err: Error | ApiError, req: Request, res: Response, next: NextFunction): void;
}
