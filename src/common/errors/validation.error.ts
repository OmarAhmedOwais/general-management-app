import { StatusCodes } from 'http-status-codes';

import { ApiError } from './api.error';

import { ResponseStatus } from '../../data/types/enums';

export class ApiValidationError extends ApiError {
  constructor(messages: ApiError['messages'], metadata?: ApiError['metadata']) {
    super({
      messages,
      statusCode: StatusCodes.BAD_REQUEST,
      metadata,
      status: ResponseStatus.ERROR,
    });
  }
}
