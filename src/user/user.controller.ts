import { UserService } from "./user.service";
import { Models } from "../data/types";
import { User } from "../data/entities";
import { BaseController } from "../base";

export class UserController extends BaseController<User> {
  constructor() {
    super(new UserService(), Models.User);
  }
}
