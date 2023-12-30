//~ Import Router
import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { niveauSchema } from '../../schema/niveau.schema.js';
import { createNiveau, deleteNiveau, fetchAllNiveau, updateNiveau } from '../controllers/niveauController.js'
const router = Router();



// Create type
router.post('/niveau', validate(niveauSchema), [validateToken, auth, admin], createNiveau)

// Fetch all
router.get('/niveau', [validateToken, auth], fetchAllNiveau);

//Update Type
router.patch('/niveau/:niveauId(\\d+)', validate(niveauSchema), [validateToken, auth, admin], updateNiveau)

// Delete Type
router.delete('/niveau/:niveauId(\\d+)',  [validateToken, auth, admin], deleteNiveau)


//~ Export router
export { router };