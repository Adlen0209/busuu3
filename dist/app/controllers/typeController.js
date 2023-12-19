import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { typeModel } from '../models/typeModel.js';
import { coreController } from './coreController.js';
const createType = async (req, res) => {
    try {
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await typeModel.createItem(req, res);
        return res.status(201).json('Type successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllType = async (req, res) => {
    try {
        const result = await typeModel.fetchAllItems(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateType = async (req, res) => {
    try {
        const typeId = await coreController.paramsHandler(req, res, 'typeId');
        await typeModel.fetchOneItem(req, res, typeId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        req.body = { ...req.body, id: typeId };
        await typeModel.updateItem(req);
        res.status(200).json(`type successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteType = async (req, res) => {
    try {
        const typeId = await coreController.paramsHandler(req, res, 'typeId');
        await typeModel.fetchOneItem(req, res, typeId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await typeModel.deleteItem(typeId);
        return res.status(200).json(`type successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createType, fetchAllType, updateType, deleteType };
//# sourceMappingURL=typeController.js.map