import { FindOptionsOrder } from 'typeorm';

export const getSortOptions = <T>(
  sort: string | undefined,
): FindOptionsOrder<T> | undefined => {
  if (!sort) return undefined;

  // EX: ?sort=title:asc,name:desc
  const sortArray = sort.split(',');

  const sortOptions: FindOptionsOrder<T> = sortArray.reduce((acc, sortOption) => {
    const [field, order] = sortOption.split(':') as [keyof T, string];

    // Convert the order to uppercase and ensure it's either 'ASC' or 'DESC'
    const sortOrder = (order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC') as 'ASC' | 'DESC';

    // Ensure that the field key is correctly typed
    acc[field] = sortOrder as any; // Use 'any' to bypass the type checking

    return acc;
  }, {} as FindOptionsOrder<T>);

  return sortOptions;
}