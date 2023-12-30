import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { niveauSchema } from '../../schema/niveau.schema.js';
import { createNiveau, deleteNiveau, fetchAllNiveau, updateNiveau } from '../controllers/niveauController.js';
const router = Router();
router.post('/niveau', validate(niveauSchema), [validateToken, auth, admin], createNiveau);
router.get('/niveau', [validateToken, auth], fetchAllNiveau);
router.patch('/niveau/:niveauId(\\d+)', validate(niveauSchema), [validateToken, auth, admin], updateNiveau);
router.delete('/niveau/:niveauId(\\d+)', [validateToken, auth, admin], deleteNiveau);
export { router };
//# sourceMappingURL=niveau.js.map