import { UserRole, UserStatus } from '@/data/types';
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  status?: UserStatus;
  [key: string]: any;
}

export interface registerBody {
  name: string;
  password: string;
  email: string;
  phone?: string;
  role?: UserRole;
}
