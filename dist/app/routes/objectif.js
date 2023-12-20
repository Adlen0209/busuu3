import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { objectifSchema } from '../../schema/objectif.schema.js';
import { createObjectif, deleteObjectif, fetchAllObjectif, updateObjectif } from '../controllers/objectifController.js';
const router = Router();
router.post('/objectif', validate(objectifSchema), [validateToken, auth, admin], createObjectif);
router.get('/objectif', [validateToken, auth], fetchAllObjectif);
router.patch('/objectif/:objectifId(\\d+)', validate(objectifSchema), [validateToken, auth, admin], updateObjectif);
router.delete('/objectif/:objectifId(\\d+)', [validateToken, auth, admin], deleteObjectif);
export { router };
//# sourceMappingURL=objectif.js.map