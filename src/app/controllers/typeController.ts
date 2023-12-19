import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { typeModel } from '../models/typeModel.js';
import { coreController } from './coreController.js';








//~ Controller
//& -------- createType
const createType = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Create Category
      await typeModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Type successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

    //& ------- Fetch All Type
const fetchAllType = async (req:Request, res: Response) => {
  try {
    //Fetch if exist
    const result = await typeModel.fetchAllItems(req, res);

    return res.status(200).json(result)
  } catch(err) {
    if(err instanceof Error) logger(err.message)
  }
};

//& -------- updateType
const updateType = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const typeId = await coreController.paramsHandler(req, res, 'typeId');

    //~ Fetch if exist
    await typeModel.fetchOneItem(req, res, typeId);

    //~ Guard Clauses
    if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Update training
    req.body = { ...req.body, id: typeId };
    await typeModel.updateItem(req);

    //~ Result
    res.status(200).json(`type successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteType
const deleteType = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const typeId = await coreController.paramsHandler(req, res, 'typeId');

    //~ Fetch if exist
    await typeModel.fetchOneItem(req, res, typeId);

    //~ Guard Clauses
    if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Delete training
    await typeModel.deleteItem(typeId);

    //~ Result
    return res.status(200).json(`type successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

  export { createType, fetchAllType, updateType, deleteType}