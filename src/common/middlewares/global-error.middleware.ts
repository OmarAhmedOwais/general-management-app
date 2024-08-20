// common/middlewares/globalError.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/common/errors';
import { ErrorHandlerContext } from '@/common/errors/ErrorHandlerContext';

export const globalErrorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorHandler = new ErrorHandlerContext(err);
  errorHandler.handle(err, req, res, next);
};
