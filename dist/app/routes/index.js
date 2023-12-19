import { Router } from "express";
const router = Router();
import { router as mainRouter } from "./mainRouter.js";
router.use(mainRouter);
import { router as userRouter } from './user.js';
router.use(userRouter);
import { router as trainingRouter } from './training.js';
router.use(trainingRouter);
import { router as typeRouter } from './type.js';
router.use(typeRouter);
export { router };
//# sourceMappingURL=index.js.map