import { AuthService } from "@/modules/auth/auth.service";
import { User } from "@/data/entities/User";
import { AppDataSource } from "@/common/config/data-source";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      // Add other methods if needed
    } as unknown as jest.Mocked<Repository<User>>;

    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(mockUserRepository);
    authService = new AuthService();
  });

  it('should register a new user with hashed password', async () => {
    const hashedPassword = 'hashedPassword';
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);

    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
      role: 'user', // Assuming 'role' is a string, adjust if needed
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUserRepository.create.mockReturnValueOnce(mockUser);
    mockUserRepository.save.mockResolvedValueOnce(mockUser);

    const result = await authService.register('test@example.com', 'password');
    expect(result).toHaveProperty('email', 'test@example.com');
    expect(mockUserRepository.save).toHaveBeenCalled();
  });
});