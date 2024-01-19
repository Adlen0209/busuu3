import { Request, Response } from 'express';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { ExerciceHasNiveau } from '../datamapper/exerciceHasNiveau.js';
import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';
import { exerciceHasNiveauModel } from '../models/exerciceHasNiveauModel.js';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies.js';









//~ Controller
//& -------- Associate exercice / niveay by user
const createExerciceHasNiveau = async (req: Request, res: Response) => {
    try {

        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
     
      
        if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
      //~ Associate
      await exerciceHasNiveauModel.createOneItem(niveauId, exerciceId, userId);
  
      //~ Result
      return res.status(201).json('Exercice has niveau successfully created !');
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };


  //& -------- Validate niveau + level up
const validateExerciceHasNiveau = async (req: Request, res: Response) => {
  try {

      const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
      const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
      const userId = await coreController.paramsHandler(req, res, 'userId');
   
    

      if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
    //~ Validate
    await exerciceHasNiveauModel.validate(niveauId, exerciceId, userId);

    //~ Niveau up
    await exerciceHasNiveauModel.createOneItem(niveauId + 1, exerciceId, userId);
   

    //~ Delete where validated = true
    await exerciceHasNiveauModel.deleteOneItem(exerciceId, userId);
    
    
    //~ Result
    return res.status(201).json('Exercice has niveau successfully validated !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

const niveauDownExerciceHasNiveau = async (req: Request, res: Response) => {
  try {

      const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
      const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
      const userId = await coreController.paramsHandler(req, res, 'userId');
   
    

      if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);

    //~ Validate
    await exerciceHasNiveauModel.validate(niveauId, exerciceId, userId);

    //~ Niveau down
    await exerciceHasNiveauModel.createOneItem(niveauId - 1, exerciceId, userId);
   

    //~ Delete where validated = true
    await exerciceHasNiveauModel.deleteOneItem(exerciceId, userId);
    
    
    //~ Result
    return res.status(201).json('Exercice has niveau successfully downed !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- Check niveau if exist
const checkNiveau = async (req: Request, res: Response) => {
  try {
      //~ Is id a number ?
      const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
      const userId = await coreController.paramsHandler(req, res, 'userId');

      //~ Guard Clauses
      if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
      const niveau = await exerciceHasNiveauModel.checkIfExist(exerciceId, userId);
      
      //~ If niveau doesn't exist return status 204
      if(niveau?.length === 0) {
        
        res.status(204).json(`Select your level`)
        
      //~ If niveau exist => return status 201
      } else if(niveau) {

        const niveauId = niveau[0].niveau_id
        // const result = await ExerciceHasNiveau.fetchSerie(exerciceId, niveauId);
        
        // console.log(result)
     
        res.status(201).json(JSON.stringify(niveauId))
        
      }
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
}

//& -------- delete niveau for exercice by user
const testNiveau = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
   const userId = await coreController.paramsHandler(req, res, 'userId');


    //~ Guard Clauses
    if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
    //~ Delete training
    const result = await ExerciceHasNiveau.testNiveau(userId, exerciceId);
    console.log(result)
    //~ Result
    return res.status(200).json(JSON.stringify(result) );
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};



//& -------- delete niveau for exercice by user
   const deleteExerciceHasNiveau = async (req: Request, res: Response) => {
     try {
       //~ Is id a number ?
       const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
       const userId = await coreController.paramsHandler(req, res, 'userId');
  
  
       //~ Guard Clauses
       if (req.user?.id !== userId) throw new ErrorApi(`You cannot access this info`, req, res, 400);
  
       //~ Delete training
       await ExerciceHasNiveau.deleteExerciceHasNiveau(exerciceId, userId);
  
       //~ Result
       return res.status(200).json(`exercice has niveau deleted`);
     } catch (err) {
       if (err instanceof Error) logger(err.message);
     }
   };

  export { createExerciceHasNiveau, validateExerciceHasNiveau, niveauDownExerciceHasNiveau, deleteExerciceHasNiveau, checkNiveau, testNiveau}