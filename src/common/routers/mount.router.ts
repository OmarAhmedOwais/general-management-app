import { Router } from 'express';

import { authRouter } from '@/modules/authentication';
import { userRouter } from '@/modules/user';


const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/users', userRouter);

export { mountRouter };
