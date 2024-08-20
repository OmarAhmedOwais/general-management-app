import { RequestHandler } from 'express';

// Improved express async handler
const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { asyncHandler };
