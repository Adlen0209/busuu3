//~ Import Router
import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { objectifSchema } from '../../schema/objectif.schema.js';
import { createObjectif, deleteObjectif, fetchAllObjectif, updateObjectif } from '../controllers/objectifController.js';
const router = Router();



// Create type
router.post('/objectif', validate(objectifSchema), [validateToken, auth, admin], createObjectif)

// Fetch all
router.get('/objectif', [validateToken, auth], fetchAllObjectif);

//Update Objectif
router.patch('/objectif/:objectifId(\\d+)', validate(objectifSchema), [validateToken, auth, admin], updateObjectif)

 // Delete Type
 router.delete('/objectif/:objectifId(\\d+)',  [validateToken, auth, admin], deleteObjectif)


//~ Export router
export { router };