import { Schema } from 'express-validator';
import { BaseValidation } from '@/base'; // Adjust the import path as necessary
import { makeOptional } from '@/common/utils';

export class UserValidation extends BaseValidation {
  constructor() {
    super();
  }

  // Create schema for User validation
  private createUserSchema(): Schema {
    return {
      ...this.getUserEmailSchema(),
      ...this.getUserPasswordSchema(),
      ...this.getUserRoleSchema(),
    };
  }

  // Schema for user email
  private getUserEmailSchema(): Schema {
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
    };
  }

  // Schema for user password
  private getUserPasswordSchema(): Schema {
    return {
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

  // Schema for user role
  private getUserRoleSchema(): Schema {
    return {
      role: {
        in: ['body'],
        isString: {
          errorMessage: 'Role must be a string',
        },
        isIn: {
          options: [['user', 'admin']],
          errorMessage: 'Role must be either "user" or "admin"',
        },
        optional: true,
      },
    };
  }

  // Get validation schema for creating a user
  protected getCreateValidation(): Schema {
    return this.createUserSchema();
  }

  // Get validation schema for updating a user
  protected getUpdateValidation(): Schema {
    return makeOptional({
      id: this.idParam,
      ...this.createUserSchema(),
    });
  }
}
