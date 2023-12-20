import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { objectifModel } from '../models/objectifModel.js';
import { coreController } from './coreController.js';
const createObjectif = async (req, res) => {
    try {
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await objectifModel.createItem(req, res);
        return res.status(201).json('Type successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllObjectif = async (req, res) => {
    try {
        const result = await objectifModel.fetchAllItems(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateObjectif = async (req, res) => {
    try {
        const objectifId = await coreController.paramsHandler(req, res, 'objectifId');
        await objectifModel.fetchOneItem(req, res, objectifId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        req.body = { ...req.body, id: objectifId };
        await objectifModel.updateItem(req);
        res.status(200).json(`objectif successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteObjectif = async (req, res) => {
    try {
        const objectifId = await coreController.paramsHandler(req, res, 'objectifId');
        await objectifModel.fetchOneItem(req, res, objectifId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await objectifModel.deleteItem(objectifId);
        return res.status(200).json(`objectif successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createObjectif, fetchAllObjectif, updateObjectif, deleteObjectif };
//# sourceMappingURL=objectifController.js.map