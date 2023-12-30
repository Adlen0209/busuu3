import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { niveauModel } from '../models/niveauModel.js';
import { coreController } from './coreController.js';
const createNiveau = async (req, res) => {
    try {
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await niveauModel.createItem(req, res);
        return res.status(201).json('Niveau successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllNiveau = async (req, res) => {
    try {
        const result = await niveauModel.fetchAllItems(req, res);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateNiveau = async (req, res) => {
    try {
        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        await niveauModel.fetchOneItem(req, res, niveauId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        req.body = { ...req.body, id: niveauId };
        await niveauModel.updateItem(req);
        res.status(200).json(`niveau successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteNiveau = async (req, res) => {
    try {
        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        await niveauModel.fetchOneItem(req, res, niveauId);
        if (req.user?.role !== 2)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await niveauModel.deleteItem(niveauId);
        return res.status(200).json(`niveau successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createNiveau, fetchAllNiveau, updateNiveau, deleteNiveau };
//# sourceMappingURL=niveauController.js.map