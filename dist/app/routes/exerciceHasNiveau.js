import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { auth } from '../middlewares/auth.js';
import { createExerciceHasNiveau, validateExerciceHasNiveau } from '../controllers/exerciceHasNiveauController.js';
const router = Router();
router.post('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], createExerciceHasNiveau);
router.patch('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], validateExerciceHasNiveau);
export { router };
//# sourceMappingURL=exerciceHasNiveau.js.map