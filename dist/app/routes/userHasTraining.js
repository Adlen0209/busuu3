import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { auth } from '../middlewares/auth.js';
import { createUserHasTraining, deleteTrainingByUser, fetchAllTrainingByUser } from '../controllers/userHasTrainingController.js';
const router = Router();
router.post('/user/:userId(\\d+)/training/:trainingId(\\d+)', [validateToken, auth], createUserHasTraining);
router.get('/user/:userId(\\d+)/userHasTraining', [validateToken, auth], fetchAllTrainingByUser);
router.delete('/user/:userId(\\d+)/training/:trainingId(\\d+)', [validateToken, auth], deleteTrainingByUser);
export { router };
//# sourceMappingURL=userHasTraining.js.map