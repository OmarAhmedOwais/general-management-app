import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { MessageType, ResponseStatus } from '@/data/types/enums';
import { IPaginationResult } from '@/data/types';

export interface ApiPagination {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  length: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ApiResponseOptions {
  name: string;
  statusCode: StatusCodes;
  status: ResponseStatus;
  messages: { message_en: string; message_ar?: string; type: MessageType }[];
  pagination?: IPaginationResult;
  data: any;
  metadata?: any;
}

export class ApiResponse {
  public statusCode;
  name;
  status;
  messages;
  pagination?: IPaginationResult;
  data;
  constructor({
    statusCode = StatusCodes.OK,
    messages,
    pagination,
    data,
  }: {
    messages: ApiResponseOptions['messages'];
    statusCode?: ApiResponseOptions['statusCode'];
    pagination?: ApiResponseOptions['pagination'];
    data: ApiResponseOptions['data'];
  }) {
    this.name = getReasonPhrase(statusCode);
    this.statusCode = statusCode;
    this.status = ResponseStatus.SUCCESS;
    this.messages = messages;
    if (pagination) {
      this.pagination = {
        // totalPages: pagination.totalPages,
        // page: pagination.page,
        // length: pagination.length,
        // limit: pagination.limit,
        total: pagination.total,
        // hasNextPage: pagination.hasNextPage,
        // hasPreviousPage: pagination.hasPreviousPage,
      };
    }
    this.data = data;
  }
}
