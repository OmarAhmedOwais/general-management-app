import { Schema } from "express-validator";

export const makeOptional = (schema: Schema): Schema => {
    const optionalSchema: Schema = {};
    for (const key in schema) {
      optionalSchema[key] = {
        ...schema[key],
        optional: true,
      };
    }
    return optionalSchema;
  };