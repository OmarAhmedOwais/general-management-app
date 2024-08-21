import { Router } from 'express';

import { authRouter } from '../../auth';
import { userRouter } from '../../user';
import { resourceRouter } from "../../resource"


const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/users', userRouter);
mountRouter.use("/resources", resourceRouter);

export { mountRouter };
