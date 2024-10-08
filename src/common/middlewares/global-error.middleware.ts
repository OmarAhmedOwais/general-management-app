import { Request, Response, NextFunction } from 'express';

import { ApiError, InternalServerError } from '../errors';

export const globalErrorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if ('statusCode' in err) {
    return res.status(err.statusCode).json(err);
  }

  const apiError = new InternalServerError(err);

  res.status(apiError.statusCode).json(apiError);
};
