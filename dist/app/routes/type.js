import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { typeSchema } from '../../schema/type.schema.js';
import { createType, deleteType, fetchAllType, updateType } from '../controllers/typeController.js';
const router = Router();
router.post('/type', validate(typeSchema), [validateToken, auth, admin], createType);
router.get('/type', [validateToken, auth], fetchAllType);
router.patch('/type/:typeId(\\d+)', validate(typeSchema), [validateToken, auth, admin], updateType);
router.delete('/type/:typeId(\\d+)', [validateToken, auth, admin], deleteType);
export { router };
//# sourceMappingURL=type.js.map