import { Schema } from 'express-validator';

export const localizedStringSchema = (
  field: string,
  isOptional: boolean,
): Schema => {
  const schema: Schema = {
    [field]: {
      in: ['body'],
      ...(isOptional && { optional: true }), // Include optional flag conditionally
      custom: {
        options: (value: object) =>
          typeof value === 'object' && 'en' in value && 'ar' in value,
        errorMessage: `${field} must be an object with (en, ar) fields`,
      },
    },
    [`${field}.en`]: {
      in: ['body'],
      ...(isOptional && { optional: true }), // Include optional flag conditionally
      isString: {
        errorMessage: `${field} in English must be a string`,
      },
      notEmpty: {
        errorMessage: `${field} in English is required`,
      },
      trim: true,
    },
    [`${field}.ar`]: {
      in: ['body'],
      ...(isOptional && { optional: true }), // Include optional flag conditionally
      isString: {
        errorMessage: `${field} in Arabic must be a string`,
      },
      notEmpty: {
        errorMessage: `${field} in Arabic is required`,
      },
      trim: true,
    },
  };

  return schema;
};
