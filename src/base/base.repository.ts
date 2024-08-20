import { Repository, DeepPartial, ObjectLiteral, FindOptionsWhere } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(item: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(item);
    return await this.repository.save(entity);
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOne({
      where: { id: parseInt(id) } as unknown as FindOptionsWhere<T>,
    });
  }

  async findAll(query: object = {}): Promise<T[]> {
    return await this.repository.find(query);
  }

  async findOne(query: object): Promise<T | null> {
    return await this.repository.findOne(query);
  }

  async update(id: string, item: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(parseInt(id), item as any);
    return await this.findById(id); // Fetch the updated entity
  }

  async delete(id: string): Promise<T | null> {
    const entity = await this.findById(id);
    if (entity) {
      await this.repository.remove(entity);
      return entity;
    }
    return null;
  }

  async countDocuments(query: object): Promise<number> {
    return await this.repository.count(query);
  }
}
