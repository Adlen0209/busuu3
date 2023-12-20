import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { objectifModel } from '../models/objectifModel.js';
import { coreController } from './coreController.js';








//~ Controller
//& -------- createObjectif
const createObjectif = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Create Category
      await objectifModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Type successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

//& ------- Fetch All Objectif
 const fetchAllObjectif = async (req:Request, res: Response) => {
   try {
   //Fetch if exist
     const result = await objectifModel.fetchAllItems(req, res);

     return res.status(200).json(result)
   } catch(err) {
     if(err instanceof Error) logger(err.message)
   }
 };

 //& -------- updateObjectif
 const updateObjectif = async (req: Request, res: Response) => {
   try {
     //~ Is id a number ?
     const objectifId = await coreController.paramsHandler(req, res, 'objectifId');

    //~ Fetch if exist
     await objectifModel.fetchOneItem(req, res, objectifId);

     //~ Guard Clauses
     if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Update training
     req.body = { ...req.body, id: objectifId };
     await objectifModel.updateItem(req);

     //~ Result
     res.status(200).json(`objectif successfully updated !`);
   } catch (err) {
     if (err instanceof Error) logger(err.message);
   }
 };

 //& -------- deleteObjectif
 const deleteObjectif = async (req: Request, res: Response) => {
   try {
     //~ Is id a number ?
     const objectifId = await coreController.paramsHandler(req, res, 'objectifId');

     //~ Fetch if exist
     await objectifModel.fetchOneItem(req, res, objectifId);

     //~ Guard Clauses
     if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);

     //~ Delete training
     await objectifModel.deleteItem(objectifId);

     //~ Result
     return res.status(200).json(`objectif successfully deleted`);
   } catch (err) {
     if (err instanceof Error) logger(err.message);
   }
 };

  export { createObjectif, fetchAllObjectif, updateObjectif, deleteObjectif}