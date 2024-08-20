import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseService } from './base.service';
import { ApiResponse, asyncHandler } from '../common/utils';
import { MessageType } from '@/data';
import { NotFoundError } from '../common/errors';
import { ObjectLiteral } from 'typeorm';

export class BaseController<T extends ObjectLiteral > {
  protected service: BaseService<T>;
  protected modelName: string;

  constructor(service: BaseService<T>, modelName: string) {
    this.service = service;
    this.modelName = modelName;
  }

  create = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.service.create(req.body as Partial<T>);
    const response = new ApiResponse({
      messages: [
        {
          message_en: `${this.modelName} Created successfully`,
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.CREATED,
      data: item,
    });
    res.status(response.statusCode).json(response);
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query || {};
    const { data, pagination } = await this.service.findAll(query);
    const response = new ApiResponse({
      messages: [
        {
          message_en: `${this.modelName}s Fetched successfully`,
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      pagination: pagination,
      data: data,
    });
    res.status(response.statusCode).json(response);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await this.service.findById(id);
    if (!item) {
      throw new NotFoundError([
        { message_en: `${this.modelName} not found`, type: MessageType.ERROR },
      ]);
    }
    const response = new ApiResponse({
      messages: [
        {
          message_en: `${this.modelName} Fetched successfully`,
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: item,
    });
    res.status(response.statusCode).json(response);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const itemData = req.body as Partial<T>;
    const updatedItem = await this.service.update(id, itemData);
    if (!updatedItem) {
      throw new NotFoundError([
        { message_en: `${this.modelName} not found`, type: MessageType.ERROR },
      ]);
    }
    const response = new ApiResponse({
      messages: [
        {
          message_en: `${this.modelName} Updated successfully`,
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: updatedItem,
    });
    res.status(response.statusCode).json(response);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedItem = await this.service.delete(id);
    if (!deletedItem) {
      throw new NotFoundError([
        { message_en: `${this.modelName} not found`, type: MessageType.ERROR },
      ]);
    }
    const response = new ApiResponse({
      messages: [
        {
          message_en: `${this.modelName} Deleted successfully`,
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: deletedItem,
    });
    res.status(response.statusCode).json(response);
  });
}
