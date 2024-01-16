import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models

import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';
import { exerciceHasNiveauModel } from '../models/exerciceHasNiveauModel.js';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies.js';









//~ Controller
//& -------- Associate exercice / niveay by user
const createExerciceHasNiveau = async (req: Request, res: Response) => {
    try {

        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
     
      
        if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
      //~ Associate
      await exerciceHasNiveauModel.createOneItem(niveauId, exerciceId, userId);
  
      //~ Result
      return res.status(201).json('Exercice has niveau successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };


  //& -------- Validate niveau
const validateExerciceHasNiveau = async (req: Request, res: Response) => {
  try {

      const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
      const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
      const userId = await coreController.paramsHandler(req, res, 'userId');
   
    

      if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
      //~ Associate
    //~ Validate
    await exerciceHasNiveauModel.validate(niveauId, exerciceId, userId);

    //~ Niveau up
    await exerciceHasNiveauModel.createOneItem(niveauId + 1, exerciceId, userId);
   

    //~ Delete where validated = true
    await exerciceHasNiveauModel.deleteOneItem(exerciceId, userId);
    
    
    //~ Result
    return res.status(201).json('Exercice has niveau successfully validated !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};
// //& ------- Fetch All training by Type
//   const fetchAllTrainingByType = async (req:Request, res: Response) => {
//     try {
//      const typeId = await coreController.paramsHandler(req, res, 'typeId')

//      //Fetch if exist
//      const training = await trainingHasTypeModel.fetchAllItems(req, res, typeId)
//       return res.status(200).json(training)
//     } catch(err) {
//       if(err instanceof Error) logger(err.message)
//     }
//   };

//   //& -------- delete Training Has Type
//   const deleteTrainingHasType = async (req: Request, res: Response) => {
//     try {
//       //~ Is id a number ?
//       const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
  
  
//       //~ Guard Clauses
//       if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
//       //~ Delete training
//       await trainingHasTypeModel.deleteOneItem(trainingId);
  
//       //~ Result
//       return res.status(200).json(`Training has type deleted`);
//     } catch (err) {
//       if (err instanceof Error) logger(err.message);
//     }
//   };

  export { createExerciceHasNiveau, validateExerciceHasNiveau}