import { StatusCodes } from 'http-status-codes';

import { ApiError } from './api.error';

import { MessageType, ResponseStatus } from '../../data/types/enums';

export class UnauthorizedError extends ApiError {
  constructor(message_en: string) {
    super({
      messages: [{ message_en, type: MessageType.ERROR }],
      statusCode: StatusCodes.UNAUTHORIZED,
      status: ResponseStatus.FAIL,
    });
  }
}
