import { BaseMiddleware } from '@/base';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/common/errors';
import { matchedData, validationResult, Schema, checkSchema } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { MessageType, ResponseStatus } from '@/data/types';
import { logger } from '@/common/utils';

export class ValidationMiddleware implements BaseMiddleware {
  constructor(private schema: Schema) {}

  execute = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    await checkSchema(this.schema).run(req);
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const messages: ApiError['messages'] = result.array().map((error) => ({
        message_en: error.msg,
        type: MessageType.ERROR,
      }));
      logger.error('Validation failed', {
        statusCode: StatusCodes.BAD_REQUEST,
        messages,
        status: ResponseStatus.ERROR,
        context: 'ValidationMiddleware',
      });
      throw new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        status: ResponseStatus.ERROR,
        messages,
      });
    }

    req.body = matchedData(req, { locations: ['body'] });
    req.query = matchedData(req, { locations: ['query'] });
    req.params = matchedData(req, { locations: ['params'] });

    next();
  };
}