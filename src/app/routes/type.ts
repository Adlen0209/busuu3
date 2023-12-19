//~ Import Router
import { Router } from 'express';
import { validate } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import { admin, auth } from '../middlewares/auth.js';
import { typeSchema } from '../../schema/type.schema.js';
import { createType, deleteType, fetchAllType, updateType } from '../controllers/typeController.js';
const router = Router();



// Create type
router.post('/type', validate(typeSchema), [validateToken, auth, admin], createType)

// Fetch all
router.get('/type', [validateToken, auth], fetchAllType);

//Update Type
router.patch('/type/:typeId(\\d+)', validate(typeSchema), [validateToken, auth, admin], updateType)

// Delete Type
router.delete('/type/:typeId(\\d+)',  [validateToken, auth, admin], deleteType)


//~ Export router
export { router };