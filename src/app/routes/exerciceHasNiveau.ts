
//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {  admin, auth } from '../middlewares/auth.js';
import { createExerciceHasNiveau, validateExerciceHasNiveau } from '../controllers/exerciceHasNiveauController.js';
const router = Router();



// Associate exercice and niveau by user
router.post('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], createExerciceHasNiveau)


// Validate niveau exercice 
router.patch('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], validateExerciceHasNiveau)
// // Fetch all
// router.get('/trainingByType/type/:typeId(\\d+)', [validateToken, auth], fetchAllTrainingByType);

 // Delete 
// router.delete('/trainingHasType/:trainingId(\\d+)',  [validateToken, auth, admin], deleteTrainingHasType)


//~ Export router
export { router };