import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { trainingModel } from '../models/trainingModel.js';
import { coreController } from './coreController.js';
const createTraining = async (req, res) => {
    try {
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await trainingModel.createItem(req, res);
        return res.status(201).json('Training successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllTraining = async (req, res) => {
    try {
        const result = await trainingModel.fetchAllItems(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateTraining = async (req, res) => {
    try {
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        await trainingModel.fetchOneItem(req, res, trainingId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        req.body = { ...req.body, id: trainingId };
        await trainingModel.updateItem(req);
        res.status(200).json(`training successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteTraining = async (req, res) => {
    try {
        const trainingId = await coreController.paramsHandler(req, res, 'trainingId');
        await trainingModel.fetchOneItem(req, res, trainingId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await trainingModel.deleteItem(trainingId);
        return res.status(200).json(`training successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createTraining, fetchAllTraining, updateTraining, deleteTraining };
//# sourceMappingURL=trainingController.js.map