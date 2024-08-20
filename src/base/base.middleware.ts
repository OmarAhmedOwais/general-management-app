import { Request, Response, NextFunction } from 'express';

export interface BaseMiddleware {
  // Standard middleware signature
  execute(req: Request, res: Response, next: NextFunction): void;

}