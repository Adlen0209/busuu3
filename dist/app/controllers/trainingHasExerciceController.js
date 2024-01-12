import debug from 'debug';
const logger = debug('Controller');
import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';
import { trainingHasExerciceModel } from '../models/trainingHasExerciceModel.js';
const createTrainingHasExercice = async (req, res) => {
    try {
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        await trainingHasExerciceModel.createOneItem(trainingId, exerciceId);
        return res.status(201).json('trainingHasType successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllExerciceByTraining = async (req, res) => {
    try {
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        const exercices = await trainingHasExerciceModel.fetchAllItems(req, res, trainingId);
        return res.status(200).json(exercices);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteExerciceInTraining = async (req, res) => {
    try {
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await trainingHasExerciceModel.deleteOneItem(trainingId, exerciceId);
        return res.status(200).json(`Exercice in trainingdeleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createTrainingHasExercice, fetchAllExerciceByTraining, deleteExerciceInTraining };
//# sourceMappingURL=trainingHasExerciceController.js.map