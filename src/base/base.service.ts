import { BaseRepository } from './base.repository';
import { Repository, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  private repository: BaseRepository<T>;

  constructor(repository: Repository<T>) {
    this.repository = new BaseRepository<T>(repository);
  }

  async findAll(query: any) {
    const data = await this.repository.findAll(query);
    const total = await this.repository.countDocuments(query);

    // Implement pagination, sorting, filtering, etc.
    return {
      data,
      pagination: {
        total,
      },
    };
  }

  async findOne(query: object): Promise<T | null> {
    return await this.repository.findOne(query);
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async create(item: Partial<T>): Promise<T> {
    return await this.repository.create(item as any);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return await this.repository.update(id, item as any);
  }

  async delete(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }
}
