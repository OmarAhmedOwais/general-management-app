import { UserController } from "@/user/user.controller";
import { UserService } from "@/user/user.service";
import { mockRequest, mockResponse } from "@/common/utils/testHelpers";

jest.mock('@/user/user.service');

describe('UserController', () => {
  let userController: UserController;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    userController = new UserController(userServiceMock);
  });

  it('should get user details successfully', async () => {
    const req = mockRequest({ params: { id: '1' } });
    const res = mockResponse();

    userServiceMock.getUserById.mockResolvedValueOnce({ id: 1, email: 'test@example.com' });

    await userController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
  });
});
