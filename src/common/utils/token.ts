import { config } from '@/common/config/config';
import jwt from 'jsonwebtoken';

export interface GenerateTokenPayload {
  id: string;
}
export const generateToken = (payload: GenerateTokenPayload): string => {
  const createdAt = Date.now();
  return jwt.sign({ ...payload, createdAt }, config.JWT_SECRET!, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

interface VerifyTokenPayload extends GenerateTokenPayload {
  createdAt: number;
}


export function verifyToken(token: string): { id: string } {
  const secretKey = process.env.JWT_SECRET || 'default_secret';

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as { id: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}

