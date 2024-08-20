import { IUser, MessageType } from "@/data/types";
import { NotFoundError } from "@/common/errors";
import RepositoryFactory from "@/common/factories/repository.factory";
import { BaseService } from "@/base/base.service";

export class UserService extends BaseService<IUser> {
  private userRepository = RepositoryFactory.createUserRepository();

  constructor() {
    super(RepositoryFactory.createUserRepository()); // Pass the userRepository to the base class constructor
  }

  async findById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError([
        { message_en: "User not found", type: MessageType.ERROR },
      ]);
    }
    return user;
  }

  async update(userId: string, userData: IUser) {
    const updatedUser = await this.userRepository.update(userId, userData);
    if (!updatedUser) {
      throw new NotFoundError([
        { message_en: "User not found", type: MessageType.ERROR },
      ]);
    }
    return updatedUser;
  }

  async delete(userId: string) {
    const deletedUser = await this.userRepository.delete(userId);
    if (!deletedUser) {
      throw new NotFoundError([
        { message_en: "User not found", type: MessageType.ERROR },
      ]);
    }
    return deletedUser;
  }
}
