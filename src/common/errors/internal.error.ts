import { StatusCodes } from 'http-status-codes';
import { ApiError } from './api.error';
import { MessageType, ResponseStatus } from '@/data/types/enums';

export class InternalServerError extends ApiError {
  constructor(error: Error) {
    super({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      messages: [
        { message_en: 'Something went wrong', type: MessageType.ERROR },
        { message_en: error.message, type: MessageType.ERROR },
      ],
      metadata: error,
      status: ResponseStatus.ERROR,
    });
  }
}