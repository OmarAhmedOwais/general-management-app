export interface IQuery {
  sort?: string;
  limit?: string;
  page?: string;
  fields?: string;
  populate?: string;
  keyword?: { [key: string]: string };
  [key: string]: string | string[] | { [key: string]: string } | undefined;
}
