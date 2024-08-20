import { UserService } from "./user.service";
import { IUser, Models } from "@/data/types";

import { BaseController } from "@/base";

export class UserController extends BaseController<IUser> {
  constructor() {
    super(new UserService(), Models.User);
  }
}
