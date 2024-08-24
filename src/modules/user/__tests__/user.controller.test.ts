import { Request, Response } from 'express';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { mockNext, mockRequest, mockResponse } from '@/common/utils/testHelpers';
import { jest } from '@jest/globals';
import { User } from '@/data/entities/User';

interface IPaginationResult {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  page: number;
  limit: number;
  total: number;
  length: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

describe('UserController', () => {
  let userController: UserController;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    userServiceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    // Instantiating UserController with the mock service and the model name 'User'
    userController = new UserController();
  });

  it('should get user details successfully', async () => {
    const req = mockRequest({ params: { id: '1' } }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    userServiceMock.findById.mockResolvedValueOnce({
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await userController.findById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      messages: [
        {
          message_en: 'User Fetched successfully',
          type: 'SUCCESS',
        },
      ],
      statusCode: 200,
      data: {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'user',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });

  it('should create a user successfully', async () => {
    const req = mockRequest({ body: { email: 'test@example.com', password: 'password123' } }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    const createdUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userServiceMock.create.mockResolvedValueOnce(createdUser);

    await userController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messages: [
        {
          message_en: 'User Created successfully',
          type: 'SUCCESS',
        },
      ],
      statusCode: 201,
      data: createdUser,
    });
  });

  it('should fetch all users successfully', async () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    const next = mockNext();
  
    const users: User[] = [
      { 
        id: 1, 
        email: 'test1@example.com', 
        password: 'hashedpassword1', 
        role: 'user', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 2, 
        email: 'test2@example.com', 
        password: 'hashedpassword2', 
        role: 'admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ];

    const pagination: IPaginationResult = {
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: 10,
      page: 1,
      limit: 10,
      total: 2,
      length: 2,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    userServiceMock.findAll.mockResolvedValueOnce({ data: users, pagination });

    await userController.findAll(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      messages: [
        {
          message_en: 'Users Fetched successfully',
          type: 'SUCCESS',
        },
      ],
      statusCode: 200,
      data: users,
      pagination,
    });
  }); 

  it('should update a user successfully', async () => {
    const req = mockRequest({ params: { id: '1' }, body: { email: 'updated@example.com' } }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();

    const updatedUser: User = {
      id: 1,
      email: 'updated@example.com',
      role: 'user',
      password: 'hashedpassword', // Add the password property
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userServiceMock.update.mockResolvedValueOnce(updatedUser);

    await userController.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      messages: [
        {
          message_en: 'User Updated successfully',
          type: 'SUCCESS',
        },
      ],
      statusCode: 200,
      data: updatedUser,
    });
  });

  it('should delete a user successfully', async () => {
    const req = mockRequest({ params: { id: '1' } }) as Request;
    const res = mockResponse() as Response;
    const next = mockNext();
  
    const deletedUser: User = {
      id: 1,
      email: 'deleted@example.com',
      password: 'hashedpassword',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    userServiceMock.delete.mockResolvedValueOnce(deletedUser);
  
    await userController.delete(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      messages: [
        {
          message_en: 'User Deleted successfully',
          type: 'SUCCESS',
        },
      ],
      statusCode: 200,
      data: deletedUser,
    });
  });
});