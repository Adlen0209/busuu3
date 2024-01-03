import debug from 'debug';
const logger = debug('Controller');
import { trainingHasTypeModel } from '../models/trainingHasTypeModel.js';
import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';
const createTrainingHasType = async (req, res) => {
    try {
        const typeId = await coreController.paramsHandler(req, res, 'typeId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        await trainingHasTypeModel.createOneItem(typeId, trainingId);
        return res.status(201).json('trainingHasType successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllTrainingByType = async (req, res) => {
    try {
        const typeId = await coreController.paramsHandler(req, res, 'typeId');
        const training = await trainingHasTypeModel.fetchAllItems(req, res, typeId);
        return res.status(200).json(training);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteTrainingHasType = async (req, res) => {
    try {
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await trainingHasTypeModel.deleteOneItem(trainingId);
        return res.status(200).json(`Training has type deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createTrainingHasType, fetchAllTrainingByType, deleteTrainingHasType };
//# sourceMappingURL=trainingHasTypeController.js.map