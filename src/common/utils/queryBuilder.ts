export class QueryBuilder {
    private query: any = {};
  
    addFilter(filter: object): QueryBuilder {
      this.query.filter = { ...this.query.filter, ...filter };
      return this;
    }
  
    addSort(sort: object): QueryBuilder {
      this.query.sort = { ...this.query.sort, ...sort };
      return this;
    }
  
    addLimit(limit: number): QueryBuilder {
      this.query.limit = limit;
      return this;
    }
  
    build(): any {
      return this.query;
    }
  }

  