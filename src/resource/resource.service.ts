import { AppDataSource } from '../common/config/data-source';
import { Resource } from '../data/entities/Resource';
import { BaseService } from '../base/base.service';

export class ResourceService extends BaseService<Resource> {
  constructor() {
    // Passing the Resource repository to the BaseService constructor
    super(AppDataSource.getRepository(Resource));
  }

  // Custom search logic for resources
  async searchResources(query: string): Promise<Resource[]> {
    return await this.repository.find({
      where: [
        { name: query },
        { description: query },
      ],
    });
  }
}
