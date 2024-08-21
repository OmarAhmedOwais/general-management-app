import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { Request, Response, NextFunction } from "express";
import { mockRequest, mockResponse, mockNext } from "@/common/utils/testHelpers";
import { User } from "@/data/entities/User"; // Import the User type

jest.mock('@/auth/auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    authServiceMock = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController();
  });

  it('should register a new user successfully', async () => {
    const req = mockRequest({ body: { email: "test@example.com", password: "password" } });
    const res = mockResponse();
    const next = mockNext();

    const mockUser: User = {
      id: 1,
      email: "test@example.com",
      password: "123123",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    authServiceMock.register.mockResolvedValueOnce(mockUser);

    await authController.register(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});