import {
  getPaginationOptions,
  getSearchOptions,
  getSortOptions,
} from "@/common/utils";
import { BaseRepository } from "./base.repository";
import { Repository, ObjectLiteral } from "typeorm";
import { IPaginationResult } from "@/data";

export class BaseService<T extends ObjectLiteral> {
  private repository: BaseRepository<T>;

  constructor(repository: Repository<T>) {
    this.repository = new BaseRepository<T>(repository);
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

    const prismaQueryOptions = {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: sortOptions,
      where: searchOptions,
    };

    const data = await this.repository.findAll(prismaQueryOptions);
    const total = await this.repository.countDocuments(query);

    const PaginationParam: IPaginationResult = {
      total: total,
      limit: itemsPerPage,
      length: data.length,
      page: currentPage,
      totalPages: Math.ceil(total / itemsPerPage),
      hasNextPage: currentPage < Math.ceil(total / itemsPerPage),
      hasPreviousPage: currentPage > 1,
    };

    // Implement pagination, sorting, filtering, etc.
    return {
      data,
      pagination: PaginationParam,
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
