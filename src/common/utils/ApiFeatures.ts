import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { IPaginationResult, IQuery } from '@/data/types';
import { QueryBuilder } from './queryBuilder';

export class ApiFeatures<T extends ObjectLiteral> {
  pagination: IPaginationResult = {
    totalPages: 0,
    page: 0,
    limit: 0,
    total: 0,
    length: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };
  data: T[] = [];
  constructor(
    public typeOrmQuery: SelectQueryBuilder<T>,
    public queryString: IQuery,
  ) {}

  sort() {
    const sort = this.queryString?.sort?.split(',').join(' ') || 'createdAt DESC';
    this.typeOrmQuery.orderBy(sort);
    return this;
  }

  filter() {
    const queryBuilder = new QueryBuilder();

    const queryObj = { ...this.queryString };
    const excludedFields = [
      'sort',
      'limit',
      'page',
      'fields',
      'keyword',
      'populate',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq|ne|in|nin)\b/g,
      (match) => `$${match}`,
    );

    let parsedQueryString;
    if (queryStr.includes('$in')) {
      parsedQueryString = JSON.parse(queryStr);
      const splitedTypes = Array.from(
        parsedQueryString['type']['$in'].split(','),
      );

      parsedQueryString['type']['$in'] = splitedTypes;
      queryStr = JSON.stringify(parsedQueryString);
    }

    this.typeOrmQuery.where(queryBuilder.addFilter(JSON.parse(queryStr)).build());

    return this;
  }

  search() {
    const { keyword } = this.queryString;

    if (keyword) {
      const keywordObj = Object.keys(keyword).map((key) => {
        if (typeof keyword[key] === 'string') {
          return `${key} ILIKE '%${keyword[key]}%'`;
        }
        const keys = (keyword[key] as unknown as [string]).map((value) => 
          `${key} ILIKE '%${value}%'`
        );
        return `(${keys.join(' OR ')})`;
      }).join(' OR ');

      this.typeOrmQuery.andWhere(`(${keywordObj})`);
    }

    return this;
  }

  limitFields() {
    const { fields } = this.queryString;
    if (fields) {
      const fieldsBy = fields.split(',').join(' ');

      this.typeOrmQuery.select(fieldsBy);
    }
    return this;
  }

  populate() {
    const populate = this.queryString?.populate?.split(',').join(' ');
    if (populate) {
      this.typeOrmQuery.leftJoinAndSelect(populate, populate);
    }
    return this;
  }

  async paginate() {
    const { limit, page } = this.queryString;
    const pageNumber = page ? +page : 1;
    const limitNumber = limit ? +limit : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const total = await this.typeOrmQuery.getCount();
    const totalPages = Math.ceil(total / limitNumber);
    const hasNextPage = pageNumber < totalPages;
    const hasPreviousPage = pageNumber > 1;

    this.typeOrmQuery.skip(skip).take(limitNumber);

    // Fetch the data before setting the pagination object
    this.data = await this.typeOrmQuery.getMany();

    this.pagination = {
      totalPages,
      page: pageNumber,
      limit: limitNumber,
      total: total,
      hasNextPage,
      hasPreviousPage,
      length: this.data.length, // Now this.data is populated and length is accurate
    };

    return this;
  }
}