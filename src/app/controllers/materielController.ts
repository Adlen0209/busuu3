import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');

//~ Import Models
import { materielModel } from '../models/materielModel.js';
import { coreController } from './coreController.js';

//& -------- createMateriel
const createMateriel = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Create Category
      await materielModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Type successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  
  //& ------- Fetch All Materiel
const fetchAllMateriel = async (req: Request, res: Response) => {
    try {
      // Fetch if exist
      const result = await materielModel.fetchAllItems(req, res);
  
      return res.status(200).json(result)
    } catch(err) {
      if (err instanceof Error) logger(err.message)
    }
    
  };
  
//& -------- updateMateriel
const updateMateriel = async (req: Request, res: Response) => {
    try {
      //~ Is id a number ?
      const materielId = await coreController.paramsHandler(req, res, 'materielId');
  
      //~ Fetch if exist
      await materielModel.fetchOneItem(req, res, materielId);
  
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Update training
      req.body = { ...req.body, id: materielId };
      await materielModel.updateItem(req);
  
      //~ Result
      res.status(200).json(`materiel successfully updated !`);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

//& -------- deleteMateriel
const deleteMateriel = async (req: Request, res: Response) => {
    try {
      //~ Is id a number ?
      const materielId = await coreController.paramsHandler(req, res, 'materielId');
  
      //~ Fetch if exist
      await materielModel.fetchOneItem(req, res, materielId);
  
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Delete training
      await materielModel.deleteItem(materielId);
  
      //~ Result
      return res.status(200).json(`materiel successfully deleted`);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  export { createMateriel, fetchAllMateriel, updateMateriel, deleteMateriel}