import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');

//~ Import Models
import { niveauModel } from '../models/niveauModel.js';
import { coreController } from './coreController.js';

//& -------- createNiveau
const createNiveau = async (req: Request, res: Response) => {
    try {
      //~ Guard Clauses
      if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      //~ Create Niveau
      await niveauModel.createItem(req, res);
  
      //~ Result
      return res.status(201).json('Niveau successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  
//& ------- Fetch All Niveau
 const fetchAllNiveau = async (req: Request, res: Response) => {
     try {
     // Fetch if exist
      const result = await niveauModel.fetchAllItems(req, res);
  
       return res.status(200).json(result)
           } catch(err) {
       if (err instanceof Error) logger(err.message)
     }
    
   };
  
//& -------- update Niveau
 const updateNiveau = async (req: Request, res: Response) => {
     try {
      //~ Is id a number ?
       const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
  
      //~ Fetch if exist
       await niveauModel.fetchOneItem(req, res, niveauId);
  
      //~ Guard Clauses
       if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
       //~ Update Niveau
       req.body = { ...req.body, id: niveauId };
       await niveauModel.updateItem(req);
  
       //~ Result
       res.status(200).json(`niveau successfully updated !`);
      } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
     };

//& -------- delete Niveau
 const deleteNiveau = async (req: Request, res: Response) => {
     try {
       //~ Is id a number ?
       const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
  
       //~ Fetch if exist
       await niveauModel.fetchOneItem(req, res, niveauId);
  
       //~ Guard Clauses
       if (req.user?.role !== 2) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
       //~ Delete Niveau
       await niveauModel.deleteItem(niveauId);
  
       //~ Result
       return res.status(200).json(`niveau successfully deleted`);
     } catch (err) {
       if (err instanceof Error) logger(err.message);
     }
   };

  export { createNiveau, fetchAllNiveau, updateNiveau, deleteNiveau }