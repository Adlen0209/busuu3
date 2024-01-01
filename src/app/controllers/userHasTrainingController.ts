import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { userHasTrainingModel } from '../models/userHasTrainingModel.js';
import { coreController } from './coreController.js';









//~ Controller
//& -------- Associate User / training
const createUserHasTraining = async (req: Request, res: Response) => {
    try {

        const userId = await coreController.paramsHandler(req, res, 'userId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
 //~ Guard Clauses
    if (req.user?.id !== userId && req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
    
     
      
  
      //~ Associate
      await userHasTrainingModel.createOneItem(userId, trainingId);
  
      //~ Result
      return res.status(201).json('userHasTraining successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

//& ------- Fetch All training by User
 const fetchAllTrainingByUser = async (req:Request, res: Response) => {
   try {
    const userId = await coreController.paramsHandler(req, res, 'userId');


    if (req.user?.id !== userId && req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
    //Fetch if exist
    const training = await userHasTrainingModel.fetchAllItems(req, res, userId)
     return res.status(200).json(training)
   } catch(err) {
     if(err instanceof Error) logger(err.message)
   }
 };

 //& -------- delete Training By User
 const deleteTrainingByUser = async (req: Request, res: Response) => {
   try {

     //~ Is id a number ?
     const userId = await coreController.paramsHandler(req, res, 'userId');
     const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
     
    //~ Guard Clauses
   if (req.user?.id !== userId && req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

     //~ Delete training
     await userHasTrainingModel.deleteOneItem(userId, trainingId);

     //~ Result
     return res.status(200).json(`training successfully deleted`);
   } catch (err) {
     if (err instanceof Error) logger(err.message);
   }
 };

  export { createUserHasTraining, fetchAllTrainingByUser, deleteTrainingByUser }