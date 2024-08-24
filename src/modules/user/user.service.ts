import { AppDataSource } from '../../common/config/data-source';
import { User } from "../../data/entities/User";
import { BaseService } from '../../base'; 



export class UserService extends BaseService<User> {

  constructor() {
    super(AppDataSource.getRepository(User)); // Pass the repository instance to the BaseService constructor
  }

}