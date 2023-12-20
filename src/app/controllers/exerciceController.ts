//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';


//~ Import Debug
import debug from 'debug';
import { exerciceModel } from '../models/exerciceModel.js';
import { coreController } from './coreController.js';
const logger = debug('Controller');

//& -------- createExercice
const createExercice = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      console.log('ici')
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
       
      //~ Create Exercice
      await exerciceModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Exercice successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  
  //& ------- Fetch All Exercice
const fetchAllExercice = async (req: Request, res: Response) => {
    try {
      // Fetch if exist
      const result = await exerciceModel.fetchAllItems(req, res);
  
      return res.status(200).json(result)
    } catch(err) {
      if (err instanceof Error) logger(err.message)
    }
    
  };
  

  
//& -------- updateExercice
const updateExercice = async (req: Request, res: Response) => {
    try {
      //~ Is id a number ?

     
      const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
      
      //~ Fetch if exist
      await exerciceModel.fetchOneItem(req, res, exerciceId);
  
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Update training
      req.body = { ...req.body, id: exerciceId };
      await exerciceModel.updateItem(req);
  
      //~ Result
      res.status(200).json(`exercice successfully updated !`);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };


  //& -------- deleteExercice
const deleteExercice = async (req: Request, res: Response) => {
    try {
      //~ Is id a number ?
      const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
  
      //~ Fetch if exist
      await exerciceModel.fetchOneItem(req, res, exerciceId);
  
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Delete training
      await exerciceModel.deleteItem(exerciceId);
  
      //~ Result
      return res.status(200).json(`exercicesuccessfully deleted`);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };
  export { createExercice, fetchAllExercice, updateExercice, deleteExercice}