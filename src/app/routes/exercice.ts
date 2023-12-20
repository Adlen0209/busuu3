//~ Import Router
import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { exerciceSchema } from '../../schema/exercice.schema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { createExercice, deleteExercice, fetchAllExercice, updateExercice } from '../controllers/exerciceController.js';
const router = Router();



// Create 
router.post('/exercice', validate(exerciceSchema), [validateToken, auth, admin], createExercice);

//~ Fetch All
router.get('/exercice', [validateToken, auth], fetchAllExercice);

//~ Update Exercice
router.patch('/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], updateExercice)

//~ Delete Exercice
router.delete('/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], deleteExercice)

export { router}