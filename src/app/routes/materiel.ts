//~ Import Router
import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { materielSchema } from '../../schema/materiel.schema.js';
import { createMateriel, deleteMateriel, fetchAllMateriel, updateMateriel } from '../controllers/materielController.js';
const router = Router();



// Create 
router.post('/materiel', validate(materielSchema), [validateToken, auth, admin], createMateriel);

//~ Fetch All
router.get('/materiel', [validateToken, auth], fetchAllMateriel);

//~ Update Exercice
router.patch('/materiel/:materielId(\\d+)', [validateToken, auth, admin], updateMateriel)

//~ Delete Exercice
router.delete('/materiel/:materielId(\\d+)', [validateToken, auth, admin], deleteMateriel)

export { router}