//Import router

import { Router} from "express";
const router = Router();


// Main router 

import { router as mainRouter } from "./mainRouter.js";
router.use(mainRouter);

//~ User
import {router as userRouter} from './user.js';
router.use(userRouter);

//~ Training
import { router as trainingRouter } from './training.js'
router.use(trainingRouter);

//~ Type
import { router as typeRouter} from './type.js'
router.use(typeRouter)

//~ Exercice
import { router as exerciceRouter } from './exercice.js'
router.use(exerciceRouter)

//~ Materiel
import { router as materielRouter} from './materiel.js'
router.use(materielRouter)

// Export router
export { router };