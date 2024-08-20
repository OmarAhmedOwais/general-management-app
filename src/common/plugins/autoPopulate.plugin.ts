import { Schema, Document, Query } from 'mongoose';

function autoPopulateFields<T extends Document>(fields: string[]) {
  return function (schema: Schema<T>) {
    function autoPopulate(this: Query<T, T>, next: Function) {
      fields.forEach((field) => this.populate(field));
      next();
    }

    schema.pre('findOne', autoPopulate).pre('find', autoPopulate);
  };
}

export { autoPopulateFields };
