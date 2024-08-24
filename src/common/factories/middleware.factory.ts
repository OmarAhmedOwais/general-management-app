import { UserRole } from '../../data/types';
import { AllowedToMiddleware } from '../../common/middlewares/allowedTo.middleware';
import { AuthMiddleware} from '../../common/middlewares/auth.middleware';
import { UserService } from '../../modules/user/user.service';

class MiddlewareFactory {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createAuthMiddleware() {
    return new AuthMiddleware(this.userService).execute;
  }

  createAllowedToMiddleware(...roles: UserRole[]) {
    return new AllowedToMiddleware(roles).execute;
  }
}

export { MiddlewareFactory };
