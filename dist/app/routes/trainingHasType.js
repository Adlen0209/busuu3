import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { createTrainingHasType, deleteTrainingHasType, fetchAllTrainingByType } from '../controllers/trainingHasTypeController.js';
const router = Router();
router.post('/training/:trainingId(\\d+)/type/:typeId(\\d+)', [validateToken, auth, admin], createTrainingHasType);
router.get('/trainingByType/type/:typeId(\\d+)', [validateToken, auth], fetchAllTrainingByType);
router.delete('/trainingHasType/:trainingId(\\d+)', [validateToken, auth, admin], deleteTrainingHasType);
export { router };
//# sourceMappingURL=trainingHasType.js.map