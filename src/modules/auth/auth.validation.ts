import { ValidationMiddleware } from '@/common/middlewares/validation.middleware';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'express-validator';

export class AuthValidation {
  // Constructor binding methods to ensure `this` context
  constructor() {
    this.registerValidationMiddleware = this.registerValidationMiddleware.bind(this);
    this.loginValidationMiddleware = this.loginValidationMiddleware.bind(this);
  }

  //schema for registration
  private registerSchema(): Schema {
    return {
      email: {
        in: ['body'],
        isEmail: {
          errorMessage: 'Email is invalid',
        },
        notEmpty: {
          errorMessage: 'Email is required',
        },
        normalizeEmail: true,
      },
      password: {
        in: ['body'],
        isString: {
          errorMessage: 'Password must be a string',
        },
        notEmpty: {
          errorMessage: 'Password is required',
        },
        isLength: {
          options: { min: 6 },
          errorMessage: 'Password must be at least 6 characters long',
        },
      },
    };
  }

  // schema for login
  private loginSchema(): Schema {
    return {
      email: {
        in: ['body'],
        isEmail: {
          errorMessage: 'Email is invalid',
        },
        notEmpty: {
          errorMessage: 'Email is required',
        },
        normalizeEmail: true,
      },
      password: {
        in: ['body'],
        isString: {
          errorMessage: 'Password must be a string',
        },
        notEmpty: {
          errorMessage: 'Password is required',
        },
        isLength: {
          options: { min: 6 },
          errorMessage: 'Password must be at least 6 characters long',
        },
      },
    };
  }

  // Middleware for registration validation
  public registerValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    const validationMiddleware = new ValidationMiddleware(this.registerSchema());
    return validationMiddleware.execute(req, res, next);
  }

  // Middleware for login validation
  public loginValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    return new ValidationMiddleware(this.loginSchema()).execute(req, res, next);
  }
}
