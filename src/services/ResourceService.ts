import { AppDataSource } from '../config/data-source';
import { Resource } from '../entities/Resource';

export class ResourceService {
  private resourceRepository = AppDataSource.getRepository(Resource);

  async createResource(resourceData: Partial<Resource>): Promise<Resource> {
    const resource = this.resourceRepository.create(resourceData);
    return await this.resourceRepository.save(resource);
  }

  async getResources(): Promise<Resource[]> {
    return await this.resourceRepository.find();
  }

  async getResourceById(id: number): Promise<Resource | null> {
    return await this.resourceRepository.findOneBy({ id });
  }

  async updateResource(id: number, resourceData: Partial<Resource>): Promise<Resource | null> {
    await this.resourceRepository.update(id, resourceData);
    return await this.getResourceById(id);
  }

  async deleteResource(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }

  async searchResources(query: string): Promise<Resource[]> {
    return await this.resourceRepository.find({
      where: [
        { name: query },
        { description: query },
      ],
    });
  }
}
