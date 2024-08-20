import { StatusCodes } from 'http-status-codes';
import { ApiError } from './api.error';
import { MessageType, ResponseStatus } from '@/data/types/enums';

export class UnauthorizedError extends ApiError {
  constructor(message_en: string, message_ar?: string) {
    super({
      messages: [
        { message_en, message_ar: message_ar ?? '', type: MessageType.ERROR },
      ],
      statusCode: StatusCodes.UNAUTHORIZED,
      status: ResponseStatus.FAIL,
    });
  }
}