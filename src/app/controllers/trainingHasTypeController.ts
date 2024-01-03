import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { trainingHasTypeModel } from '../models/trainingHasTypeModel.js';
import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';









//~ Controller
//& -------- Associate User / training
const createTrainingHasType = async (req: Request, res: Response) => {
    try {

        const typeId = await coreController.paramsHandler(req, res, 'typeId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
     
      
  
      //~ Associate
      await trainingHasTypeModel.createOneItem(typeId, trainingId);
  
      //~ Result
      return res.status(201).json('trainingHasType successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

//& ------- Fetch All training by Type
  const fetchAllTrainingByType = async (req:Request, res: Response) => {
    try {
     const typeId = await coreController.paramsHandler(req, res, 'typeId')

     //Fetch if exist
     const training = await trainingHasTypeModel.fetchAllItems(req, res, typeId)
      return res.status(200).json(training)
    } catch(err) {
      if(err instanceof Error) logger(err.message)
    }
  };

  //& -------- delete Training Has Type
  const deleteTrainingHasType = async (req: Request, res: Response) => {
    try {
      //~ Is id a number ?
      const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
  
  
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Delete training
      await trainingHasTypeModel.deleteOneItem(trainingId);
  
      //~ Result
      return res.status(200).json(`Training has type deleted`);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  export { createTrainingHasType, fetchAllTrainingByType, deleteTrainingHasType }