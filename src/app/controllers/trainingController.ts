//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { trainingModel } from '../models/trainingModel.js';
import { coreController } from './coreController.js';







//~ Controller
//& -------- createCategory
const createTraining = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
  
      //~ Create Category
      await trainingModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Training successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

const fetchAllTraining = async (req: Request, res: Response) => {
  try {
    // Fetch if exist
    const result = await trainingModel.fetchAllItems(req, res);

    return res.status(200).json(result)
  } catch(err) {
    if (err instanceof Error) logger(err.message)
  }
  
};

//& -------- updateTraining
const updateTraining = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const trainingId = await coreController.paramsHandler(req, res, 'trainingId');

    //~ Fetch if exist
    await trainingModel.fetchOneItem(req, res, trainingId);

    //~ Guard Clauses
    if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Update training
    req.body = { ...req.body, id: trainingId };
    await trainingModel.updateItem(req);

    //~ Result
    res.status(200).json(`training successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteCategory
const deleteTraining = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const trainingId = await coreController.paramsHandler(req, res, 'trainingId');

    //~ Fetch if exist
    await trainingModel.fetchOneItem(req, res, trainingId);

    //~ Guard Clauses
    if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Delete training
    await trainingModel.deleteItem(trainingId);

    //~ Result
    return res.status(200).json(`training successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

  export { createTraining, fetchAllTraining, updateTraining, deleteTraining };