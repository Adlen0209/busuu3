
//~ Import Router
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import {  admin, auth } from '../middlewares/auth.js';
import { checkNiveau, createExerciceHasNiveau, deleteExerciceHasNiveau, niveauDownExerciceHasNiveau, testNiveau, validateExerciceHasNiveau } from '../controllers/exerciceHasNiveauController.js';
const router = Router();



// Associate exercice and niveau by user
router.post('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], createExerciceHasNiveau)


// Validate niveau exercice 
router.patch('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], validateExerciceHasNiveau)

// niveau down 
router.patch('/niveau/:niveauId(\\d+)/exercice/:exerciceId(\\d+)/user/:userId(\\d+)/down', [validateToken, auth], niveauDownExerciceHasNiveau)

// Check niveau 
router.get('/exercicehasniveau/exercice/:exerciceId(\\d+)/user/:userId(\\d+)', [validateToken, auth], checkNiveau)

// Delete 
router.delete('/exercicehasniveau/exercice/:exerciceId(\\d+)/user/:userId(\\d+)',  [validateToken, auth, admin], deleteExerciceHasNiveau)

//test
router.post('/exerciceHasSerie/user/:userId(\\d+)/exercice/:exerciceId(\\d+)', [validateToken, auth],  testNiveau)

//~ Export router
export { router };