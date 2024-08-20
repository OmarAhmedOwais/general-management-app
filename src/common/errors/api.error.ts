import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { MessageType, ResponseStatus } from '@/data/types/enums';
import { logger } from '@/common/utils/logger';
import { config } from '@/common/config/config';

interface ApiErrorOptions {
  statusCode: StatusCodes;
  messages: { message_en: string; message_ar?: string; type?: MessageType }[];
  metadata?: any;
  status: ResponseStatus;
}

export class ApiError extends Error {
  public statusCode: StatusCodes;
  public status: ResponseStatus;
  public messages: { message_en: string; message_ar?: string; type?: MessageType }[];
  public metadata?: any;

  constructor({ statusCode, messages, metadata, status }: ApiErrorOptions) {
    super();
    this.name = getReasonPhrase(statusCode);
    this.statusCode = statusCode;
    this.status = status;
    this.messages = messages;
    this.metadata = metadata;
    this.stack = config.NODE_ENV === 'production' ? 'You are in production' : this.stack;

    // Log the creation of the error
    logger.error(`ApiError created: ${this.name}`, {
      statusCode,
      messages,
      metadata,
      status,
      stack: this.stack,
    });
  }
}