import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateSchema.js';
import { trainingSchema } from '../../schema/training.schema.js';
import { createTraining, deleteTraining, fetchAllTraining, updateTraining } from '../controllers/trainingController.js';
const router = Router();
router.post('/training', validate(trainingSchema), [validateToken, auth, admin], createTraining);
router.get('/training', [validateToken, auth], fetchAllTraining);
router.patch('/training/:trainingId(\\d+)', validate(trainingSchema), [validateToken, auth, admin], updateTraining);
router.delete('/training/:trainingId(\\d+)', [validateToken, auth, admin], deleteTraining);
export { router };
//# sourceMappingURL=training.js.map