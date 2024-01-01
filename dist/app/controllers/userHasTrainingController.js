import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { userHasTrainingModel } from '../models/userHasTrainingModel.js';
import { coreController } from './coreController.js';
const createUserHasTraining = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        if (req.user?.id !== userId && req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await userHasTrainingModel.createOneItem(userId, trainingId);
        return res.status(201).json('userHasTraining successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllTrainingByUser = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId && req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        const training = await userHasTrainingModel.fetchAllItems(req, res, userId);
        return res.status(200).json(training);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteTrainingByUser = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        if (req.user?.id !== userId && req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await userHasTrainingModel.deleteOneItem(userId, trainingId);
        return res.status(200).json(`training successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createUserHasTraining, fetchAllTrainingByUser, deleteTrainingByUser };
//# sourceMappingURL=userHasTrainingController.js.map