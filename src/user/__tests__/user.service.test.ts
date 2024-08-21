import { UserService } from "@/user/user.service";
import { User } from "@/data/entities/User";
import { AppDataSource } from "@/common/config/data-source";

jest.mock('@/common/config/data-source');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<typeof AppDataSource.getRepository>;

  beforeEach(() => {
    mockUserRepository = AppDataSource.getRepository(User);
    userService = new UserService();
  });

  it('should return user details by ID', async () => {
    mockUserRepository.findOneBy.mockResolvedValueOnce({ id: 1, email: 'test@example.com' });

    const user = await userService.getUserById(1);
    expect(user).toEqual({ id: 1, email: 'test@example.com' });
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
});
