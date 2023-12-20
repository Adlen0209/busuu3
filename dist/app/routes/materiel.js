import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { materielSchema } from '../../schema/materiel.schema.js';
import { createMateriel, deleteMateriel, fetchAllMateriel, updateMateriel } from '../controllers/materielController.js';
const router = Router();
router.post('/materiel', validate(materielSchema), [validateToken, auth, admin], createMateriel);
router.get('/materiel', [validateToken, auth], fetchAllMateriel);
router.patch('/materiel/:materielId(\\d+)', [validateToken, auth, admin], updateMateriel);
router.delete('/materiel/:materielId(\\d+)', [validateToken, auth, admin], deleteMateriel);
export { router };
//# sourceMappingURL=materiel.js.map