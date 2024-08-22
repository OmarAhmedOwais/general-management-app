import {
  getPaginationOptions,
  getSearchOptions,
  getSortOptions,
} from "../common/utils";
import { Repository, ObjectLiteral, DeepPartial } from "typeorm";
import { IPaginationResult } from "../data";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseService<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(query: any) {
    const { page, limit, sort, search, fields } = query;

    const { currentPage, itemsPerPage } = getPaginationOptions(
      page as string | undefined,
      limit as string | undefined
    );
    const sortOptions = getSortOptions(sort as string | undefined);
    const searchOptions = getSearchOptions(
      search as string | undefined,
      fields
    );

    const typeOrmQueryOptions = {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      order: sortOptions,
      where: searchOptions,
    };

    const [data, total] = await this.repository.findAndCount(typeOrmQueryOptions);

    const paginationParam: IPaginationResult = {
      total: total,
      limit: itemsPerPage,
      length: data.length,
      page: currentPage,
      totalPages: Math.ceil(total / itemsPerPage),
      hasNextPage: currentPage < Math.ceil(total / itemsPerPage),
      hasPreviousPage: currentPage > 1,
    };

    return {
      data,
      pagination: paginationParam,
    };
  }

  async findOne(query: object): Promise<T | null> {
    return await this.repository.findOneBy(query);
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any);
  }

  async create(item: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(item);
    return await this.repository.save(entity);
  }

  async update(id: string, item: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.repository.update(id, item);
    return await this.repository.findOneBy({ id } as any);
  }

  async delete(id: string): Promise<T | null> {
    const entity = await this.repository.findOneBy({ id } as any);
    if (entity) {
      await this.repository.remove(entity);
    }
    return entity;
  }
}