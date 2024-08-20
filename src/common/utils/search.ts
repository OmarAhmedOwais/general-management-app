import { FindOptionsWhere, ILike } from 'typeorm';

export const getSearchOptions = <T>(
  search: string | undefined,
  fields: (keyof T)[],
): FindOptionsWhere<T> | undefined => {
  if (!search) return undefined;

  // Generate the search conditions for each field
  const searchConditions = fields.map((field) => ({
    [field]: ILike(`%${search}%`), // Case-insensitive search
  }));

  return {
    // Combine the conditions with OR logic
    where: searchConditions.length > 0 ? { $or: searchConditions } : undefined,
  } as FindOptionsWhere<T>;
};
