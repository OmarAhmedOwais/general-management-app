// user validation 
import { body } from 'express-validator';
import { UserRole } from '@/data/types';


export const createUserValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('role').isIn([UserRole.ADMIN, UserRole.USER]),
];
