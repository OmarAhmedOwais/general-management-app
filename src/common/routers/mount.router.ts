import { Router } from 'express';

import { authRouter } from '@/auth';
import { userRouter } from '@/user';


const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/users', userRouter);
mountRouter.use("/resources", resourceRoutes);

export { mountRouter };
