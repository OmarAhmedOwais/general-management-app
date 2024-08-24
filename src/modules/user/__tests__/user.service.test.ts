import { UserService } from "@/modules/user/user.service";
import { User } from "@/data/entities/User";
import { AppDataSource } from "@/common/config/data-source";
import { Repository } from "typeorm";

jest.mock('@/common/config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    // Mock the repository
    mockUserRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    // Mock the AppDataSource.getRepository to return the mocked repository
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockUserRepository);

    // Create an instance of UserService
    userService = new UserService();
  });

  it('should return user details by ID', async () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock findOneBy to return the mock user
    mockUserRepository.findOneBy.mockResolvedValueOnce(mockUser);

    const user = await userService.findById("1");

    expect(user).toEqual(mockUser);
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should throw NotFoundError if user is not found', async () => {
    // Mock findOneBy to return null
    mockUserRepository.findOneBy.mockResolvedValueOnce(null);

    await expect(userService.findById("1")).rejects.toThrowError("User not found");
  });
});
