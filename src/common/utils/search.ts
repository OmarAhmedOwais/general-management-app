import { FindOptionsWhere, ILike } from 'typeorm';

export const getSearchOptions = <T>(
  search: string | undefined,
  fields: (keyof T)[],
): FindOptionsWhere<T>[] | undefined => {
  if (!search) return undefined;

  // Generate the search conditions for each field
  const searchConditions = fields.map((field) => ({
    [field]: ILike(`%${search}%`), // Case-insensitive search
  })) as FindOptionsWhere<T>[]; // Type assertion here

  // Return the array of conditions
  return searchConditions.length > 0 ? searchConditions : undefined;
};