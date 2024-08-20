import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();


export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await authService.register(email, password);
  res.status(201).json(user);
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
