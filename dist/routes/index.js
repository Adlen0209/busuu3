import { Router } from "express";
const router = Router();
import { router as mainRouter } from "./mainRouter";
router.use(mainRouter);
export { router };
//# sourceMappingURL=index.js.map