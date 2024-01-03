
//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {  admin, auth } from '../middlewares/auth.js';
import { createTrainingHasType, deleteTrainingHasType, fetchAllTrainingByType } from '../controllers/trainingHasTypeController.js';
const router = Router();



// Create/ Associate training and type
router.post('/training/:trainingId(\\d+)/type/:typeId(\\d+)', [validateToken, auth, admin], createTrainingHasType)

// Fetch all
router.get('/trainingByType/type/:typeId(\\d+)', [validateToken, auth], fetchAllTrainingByType);

// Delete Type
router.delete('/trainingHasType/:trainingId(\\d+)',  [validateToken, auth, admin], deleteTrainingHasType)


//~ Export router
export { router };