//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validateSchema.js';
import { trainingSchema } from '../../schema/training.schema.js'
import { createTraining, deleteTraining, fetchAllTraining, updateTraining } from '../controllers/trainingController.js';
const router = Router();






//~ Create training
router.post('/training', validate(trainingSchema), [validateToken, auth, admin], createTraining);

//~ Fetch All
router.get('/training', [validateToken, auth], fetchAllTraining);

//~ Update Training
router.patch('/training/:trainingId(\\d+)', validate(trainingSchema), [validateToken, auth, admin], updateTraining);

//~Delete Training
router.delete('/training/:trainingId(\\d+)', [validateToken, auth, admin], deleteTraining);











//~ Export router
export { router };