import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { exerciceSchema } from '../../schema/exercice.schema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { createExercice, deleteExercice, fetchAllExercice, updateExercice } from '../controllers/exerciceController.js';
const router = Router();
router.post('/exercice', validate(exerciceSchema), [validateToken, auth, admin], createExercice);
router.get('/exercice', [validateToken, auth], fetchAllExercice);
router.patch('/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], updateExercice);
router.delete('/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], deleteExercice);
export { router };
//# sourceMappingURL=exercice.js.map