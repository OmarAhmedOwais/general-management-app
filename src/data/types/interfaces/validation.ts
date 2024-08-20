import { Schema } from 'express-validator';

export type ValidationSchema<T> =
  | {
      [key in keyof T]: Schema;
    }
  | Schema;
