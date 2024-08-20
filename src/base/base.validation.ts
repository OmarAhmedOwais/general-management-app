import { Schema, ParamSchema } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationMiddleware } from '@/common/middlewares/validation.middleware';


export abstract class BaseValidation {
  protected idParam: ParamSchema = {
    in: ['params'],
    isEmpty: {
      negated: true,
      errorMessage: 'ID cannot be empty',
    },
    isMongoId: {
      errorMessage: 'ID is not a valid MongoID',
    },
  };

  protected paginationQuery: Schema = {
    page: {
      in: ['query'],
      optional: true,
      isInt: {
        options: { gt: 0 },
        errorMessage: 'page must be a positive integer',
      },
    },
    limit: {
      in: ['query'],
      optional: true,
      isInt: {
        options: { gt: 0 },
        errorMessage: 'limit must be a positive integer',
      },
    },
    sortBy: {
      in: ['query'],
      optional: true,
      isString: {
        errorMessage: 'sortBy must be a string',
      },
    },
    order: {
      in: ['query'],
      optional: true,
      isIn: {
        options: [['asc', 'desc']],
        errorMessage: 'order must be either asc or desc',
      },
    },
  };

  private static readonly errorMessages = {
    string: (field: string) => `${field} must be a string`,
    notEmpty: (field: string) => `${field} cannot be empty`,
    validPostalCode: () => `The provided postal code is invalid.`,
    validPhoneNumber: () => `The provided phone number is invalid.`,
  };

  protected static getErrorMessages() {
    return this.errorMessages;
  }

  protected static createStringSchema(
    field: string,
    isOptional = false,
  ): Schema {
    return {
      [field]: {
        in: ['body'],
        isString: {
          errorMessage: BaseValidation.errorMessages.string(field),
        },
        optional: isOptional ? { options: { nullable: true } } : undefined,
      },
    };
  }

  protected getDeleteValidation(): Schema {
    return {
      id: this.idParam,
    };
  }

  protected getFindByIdValidation(): Schema {
    return {
      id: this.idParam,
    };
  }

  protected getFindAllValidation(): Schema {
    return this.paginationQuery;
  }

  constructor() {
    this.createValidationMiddleware = this.createValidationMiddleware.bind(this);
    this.updateValidationMiddleware = this.updateValidationMiddleware.bind(this);
    this.deleteValidationMiddleware = this.deleteValidationMiddleware.bind(this);
    this.findByIdValidationMiddleware = this.findByIdValidationMiddleware.bind(this);
    this.findAllValidationMiddleware = this.findAllValidationMiddleware.bind(this);
  }

  public createValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    return new ValidationMiddleware(this.getCreateValidation()).execute(req, res, next);
  }

  public updateValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    return new ValidationMiddleware(this.getUpdateValidation()).execute(req, res, next);
  }

  public deleteValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    return new ValidationMiddleware(this.getDeleteValidation()).execute(req, res, next);
  }

  public findByIdValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    return new ValidationMiddleware(this.getFindByIdValidation()).execute(req, res, next);
  }

  public findAllValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    return new ValidationMiddleware(this.getFindAllValidation()).execute(req, res, next);
  }

  protected abstract getCreateValidation(): Schema;
  protected abstract getUpdateValidation(): Schema;
}
