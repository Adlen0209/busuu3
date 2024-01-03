
//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {  admin, auth } from '../middlewares/auth.js';
import { createTrainingHasExercice, fetchAllExerciceByTraining } from '../controllers/trainingHasExerciceController.js';
const router = Router();



// Create/ Associate training and exercice
router.post('/training/:trainingId(\\d+)/exercice/:exerciceId(\\d+)', [validateToken, auth, admin], createTrainingHasExercice)

// Fetch all exercices by training
router.get('/trainingHasExercice/training/:trainingId(\\d+)', [validateToken, auth], fetchAllExerciceByTraining);

// // Delete Type
// router.delete('/trainingHasType/:trainingId(\\d+)',  [validateToken, auth, admin], deleteTrainingHasType)


//~ Export router
export { router };