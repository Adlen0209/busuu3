//Import router

import { Router} from "express";
const router = Router();


// Main router 

import { router as mainRouter } from "./mainRouter.js";
router.use(mainRouter);

//~ User
import {router as userRouter} from './user.js';
router.use(userRouter);

export { router };