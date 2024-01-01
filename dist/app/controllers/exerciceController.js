import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
import { exerciceModel } from '../models/exerciceModel.js';
import { coreController } from './coreController.js';
const logger = debug('Controller');
const createExercice = async (req, res) => {
    try {
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await exerciceModel.createItem(req, res);
        return res.status(201).json('Exercice successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllExercice = async (req, res) => {
    try {
        const result = await exerciceModel.fetchAllItems(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateExercice = async (req, res) => {
    try {
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        await exerciceModel.fetchOneItem(req, res, exerciceId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        req.body = { ...req.body, id: exerciceId };
        await exerciceModel.updateItem(req);
        res.status(200).json(`exercice successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteExercice = async (req, res) => {
    try {
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        await exerciceModel.fetchOneItem(req, res, exerciceId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await exerciceModel.deleteItem(exerciceId);
        return res.status(200).json(`exercicesuccessfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createExercice, fetchAllExercice, updateExercice, deleteExercice };
//# sourceMappingURL=exerciceController.js.map