import { BaseMiddleware } from '@/base';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@/common/errors';
import { IUser, UserRole } from '@/data/types';

class AllowedToMiddleware implements BaseMiddleware {
  constructor(private allowedRoles: UserRole[]) {}

  execute = (req: Request, _res: Response, next: NextFunction): void => {
    const userRole = (req.user as IUser)?.role;
    if (!this.allowedRoles.includes(userRole)) {
      throw new UnauthorizedError('You are not authorized');
    }
    next();
  };
}

export { AllowedToMiddleware };
