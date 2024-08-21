import { AppDataSource } from '../common/config/data-source';
import { User } from '../data/entities';
import { BaseService } from '../base'; 
import { NotFoundError } from '../common/errors';
import { MessageType } from '../data';

export class UserService extends BaseService<User> {
  private userRepository = AppDataSource.getRepository(User);

  constructor() {
    super(AppDataSource.getRepository(User)); // Pass the repository instance to the BaseService constructor
  }

  async findById(userId: string) {
    const user = await this.userRepository.findOneBy({ id: parseInt(userId) });
    if (!user) {
      throw new NotFoundError([
        { message_en: "User not found", type: MessageType.ERROR },
      ]);
    }
    return user;
  }

  async update(userId: string, userData: Partial<User>) {
    const updatedUser = await super.update(userId, userData);
    if (!updatedUser) {
      throw new NotFoundError([
        { message_en: "User not found", type: MessageType.ERROR },
      ]);
    }
    return updatedUser;
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOneBy({ id: parseInt(userId) });
    if (!user) {
      throw new NotFoundError([
        { message_en: "User not found", type: MessageType.ERROR },
      ]);
    }
    await this.userRepository.remove(user);
    return user;
  }
}