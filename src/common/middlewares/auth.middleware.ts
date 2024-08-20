import { BaseMiddleware } from '@/base';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@/common/errors';
import { logger, verifyToken } from '@/common/utils';
import { UserService } from '@/services/identity';
import { IUser } from '@/data/types';

class AuthMiddleware implements BaseMiddleware {
  constructor(private userService: UserService) {}
  execute = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authorizationHeader = req.headers.authorization;
    logger.info('Authorization Header:', authorizationHeader);
    logger.info('authMiddleware: Checking authentication');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      logger.error('Authorization header is missing or does not start with "Bearer "');
      return next(new UnauthorizedError('Please login first to get access', 'يرجى تسجيل الدخول أولاً'));
    }

    const token = authorizationHeader.split(' ')[1];
    logger.info('Extracted Token:', token);

    if (!token || token === 'null') {
      logger.error('Token is missing or null');
      return next(new UnauthorizedError('Please login first to get access', 'يرجى تسجيل الدخول أولاً'));
    }

    try {
      const { id } = verifyToken(token);
      logger.info('Token verified successfully. User ID:', id);

      const user = await this.userService.findById(id) as IUser;
      if (!user) {
        logger.error('User not found for ID:', id);
        return next(new UnauthorizedError('Your account does not exist'));
      }
      req.user = user;
      next();
    } catch (error) {
      logger.error('Token verification failed:', error);
      return next(new UnauthorizedError('Invalid token', 'رمز غير صالح'));
    }
  };
}

export { AuthMiddleware };
