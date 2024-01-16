import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { checkNiveau, createExerciceHasNiveau, deleteExerciceHasNiveau, niveauDownExerciceHasNiveau, validateExerciceHasNiveau } from '../controllers/exerciceHasNiveauController.js';
const router = Router();
router.post('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], createExerciceHasNiveau);
router.patch('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], validateExerciceHasNiveau);
router.patch('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)/down', [validateToken, auth], niveauDownExerciceHasNiveau);
router.get('/exercicehasniveau/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], checkNiveau);
router.delete('/exercicehasniveau/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth, admin], deleteExerciceHasNiveau);
export { router };
//# sourceMappingURL=exerciceHasNiveau.js.map