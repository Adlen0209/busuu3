
//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {  auth } from '../middlewares/auth.js';
import { createUserHasTraining, deleteTrainingByUser, fetchAllTrainingByUser } from '../controllers/userHasTrainingController.js';
const router = Router();



// Create/ Associate user and training
router.post('/user/:userId(\\d+)/training/:trainingId(\\d+)', [validateToken, auth], createUserHasTraining)

// Fetch all
router.get('/user/:userId(\\d+)/userHasTraining', [validateToken, auth], fetchAllTrainingByUser);

// Delete Type
router.delete('/user/:userId(\\d+)/training/:trainingId(\\d+)',  [validateToken, auth], deleteTrainingByUser)


//~ Export router
export { router };