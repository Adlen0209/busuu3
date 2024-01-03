import debug from 'debug';
const logger = debug('Controller');
import { coreController } from './coreController.js';
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
export { createTrainingHasExercice, fetchAllExerciceByTraining };
//# sourceMappingURL=trainingHasExerciceController.js.map