//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { trainingModel } from '../models/trainingModel.js';







//~ Controller
//& -------- createCategory
const createTraining = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
  
      //~ Create Category
      await trainingModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Category successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };



  export { createTraining};