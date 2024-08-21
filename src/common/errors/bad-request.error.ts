import { StatusCodes } from 'http-status-codes';

import { ApiError } from './api.error';

import { ResponseStatus } from '../../data/types';

export class BadRequestError extends ApiError {
  constructor(messages: ApiError['messages'], metadata?: ApiError['metadata']) {
    super({
      statusCode: StatusCodes.BAD_REQUEST,
      messages,
      metadata,
      status: ResponseStatus.ERROR,
    });
  }
}
