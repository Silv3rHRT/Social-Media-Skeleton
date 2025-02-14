import { Router } from "express";
import { userRouter } from './courseRoutes.js'
import { thoughtRouter } from './userRoutes.js'

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;