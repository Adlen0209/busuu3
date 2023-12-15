//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import { admin, auth } from '../middlewares/auth';
import { validate } from '../middlewares/validateSchema.js';
import { trainingSchema } from '../../schema/training.schema';
import { createTraining } from '../controllers/trainingController';
const router = Router();






//~ Create training
router.post('/training', validate(trainingSchema), [validateToken, auth, admin], createTraining);


















//~ Export router
export { router };