import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  
  // @ts-ignore
  import Layer from "express/lib/router/layer";
  
  Layer.prototype.handle_request = async function handle(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const fn = this.handle;
    if (fn.length > 3) return next();
    try {
      await fn(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };