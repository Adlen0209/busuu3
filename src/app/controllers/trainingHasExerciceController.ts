import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';
import { trainingHasExerciceModel } from '../models/trainingHasExerciceModel.js';









//~ Controller
//& -------- Associate User / training
const createTrainingHasExercice = async (req: Request, res: Response) => {
    try {

        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
     
      
  
      //~ Associate
      await trainingHasExerciceModel.createOneItem(trainingId, exerciceId);
  
      //~ Result
      return res.status(201).json('trainingHasType successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

//& ------- Fetch All exercice by training
   const fetchAllExerciceByTraining = async (req:Request, res: Response) => {
     try {
      const trainingId = await coreController.paramsHandler(req, res, 'trainingId')

      //Fetch if exist
      const exercices = await trainingHasExerciceModel.fetchAllItems(req, res, trainingId)
       return res.status(200).json(exercices)
     } catch(err) {
       if(err instanceof Error) logger(err.message)
     }
   };

   //& -------- delete Exercice in training
   const deleteExerciceInTraining = async (req: Request, res: Response) => {
     try {
       //~ Is id a number ?
       const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
       const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
  
  
       //~ Guard Clauses
       if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
       //~ Delete training
       await trainingHasExerciceModel.deleteOneItem(trainingId, exerciceId);
  
       //~ Result
       return res.status(200).json(`Exercice in trainingdeleted`);
     } catch (err) {
       if (err instanceof Error) logger(err.message);
     }
   };

  export { createTrainingHasExercice, fetchAllExerciceByTraining, deleteExerciceInTraining }