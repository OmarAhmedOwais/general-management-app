import { Router } from 'express';

import { authRouter } from '../../modules/auth';
import { userRouter } from '../../modules/user';
import { resourceRouter } from "../../modules/resource"


const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/users', userRouter);
mountRouter.use("/resources", resourceRouter);

export { mountRouter };
