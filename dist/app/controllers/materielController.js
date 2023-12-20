import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { materielModel } from '../models/materielModel.js';
import { coreController } from './coreController.js';
const createMateriel = async (req, res) => {
    try {
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await materielModel.createItem(req, res);
        return res.status(201).json('Type successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllMateriel = async (req, res) => {
    try {
        const result = await materielModel.fetchAllItems(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateMateriel = async (req, res) => {
    try {
        const materielId = await coreController.paramsHandler(req, res, 'materielId');
        await materielModel.fetchOneItem(req, res, materielId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        req.body = { ...req.body, id: materielId };
        await materielModel.updateItem(req);
        res.status(200).json(`materiel successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteMateriel = async (req, res) => {
    try {
        const materielId = await coreController.paramsHandler(req, res, 'materielId');
        await materielModel.fetchOneItem(req, res, materielId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await materielModel.deleteItem(materielId);
        return res.status(200).json(`materiel successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createMateriel, fetchAllMateriel, updateMateriel, deleteMateriel };
//# sourceMappingURL=materielController.js.map