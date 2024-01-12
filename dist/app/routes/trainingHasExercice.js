import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { createTrainingHasExercice, deleteExerciceInTraining, fetchAllExerciceByTraining } from '../controllers/trainingHasExerciceController.js';
const router = Router();
router.post('/training/:trainingId(\\d+)/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], createTrainingHasExercice);
router.get('/trainingHasExercice/training/:trainingId(\\d+)', [validateToken, auth], fetchAllExerciceByTraining);
router.delete('/trainingHasExercice/training/:trainingId(\\d+)/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], deleteExerciceInTraining);
export { router };
//# sourceMappingURL=trainingHasExercice.js.map