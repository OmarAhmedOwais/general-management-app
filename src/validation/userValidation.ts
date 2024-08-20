import { checkSchema } from 'express-validator';

export const userValidationSchema = checkSchema({
    email: {
      in: ['body'],
      isEmail: true,
      errorMessage: 'Invalid email',
    },
    password: {
      in: ['body'],
      isLength: {
        options: { min: 6 },
        errorMessage: 'Password should be at least 6 characters',
      },
    },
  });