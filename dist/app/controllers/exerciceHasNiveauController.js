import debug from 'debug';
const logger = debug('Controller');
import { ExerciceHasNiveau } from '../datamapper/exerciceHasNiveau.js';
import { coreController } from './coreController.js';
import { ErrorApi } from '../services/errorHandler.js';
import { exerciceHasNiveauModel } from '../models/exerciceHasNiveauModel.js';
const createExerciceHasNiveau = async (req, res) => {
    try {
        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await exerciceHasNiveauModel.createOneItem(niveauId, exerciceId, userId);
        return res.status(201).json('Exercice has niveau successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const validateExerciceHasNiveau = async (req, res) => {
    try {
        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await exerciceHasNiveauModel.validate(niveauId, exerciceId, userId);
        await exerciceHasNiveauModel.createOneItem(niveauId + 1, exerciceId, userId);
        await exerciceHasNiveauModel.deleteOneItem(exerciceId, userId);
        return res.status(201).json('Exercice has niveau successfully validated !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const niveauDownExerciceHasNiveau = async (req, res) => {
    try {
        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await exerciceHasNiveauModel.validate(niveauId, exerciceId, userId);
        await exerciceHasNiveauModel.createOneItem(niveauId - 1, exerciceId, userId);
        await exerciceHasNiveauModel.deleteOneItem(exerciceId, userId);
        return res.status(201).json('Exercice has niveau successfully downed !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const checkNiveau = async (req, res) => {
    try {
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        const niveau = await exerciceHasNiveauModel.checkIfExist(exerciceId, userId);
        if (niveau?.length === 0) {
            res.status(204).json(`Select your level`);
        }
        else if (niveau) {
            const niveauId = niveau[0].niveau_id;
            res.status(201).json(JSON.stringify(niveauId));
        }
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const testNiveau = async (req, res) => {
    try {
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        console.log("avant");
        const result = await ExerciceHasNiveau.testNiveau(userId, exerciceId);
        console.log("apres");
        console.log(result);
        return res.status(200).json(JSON.stringify(result));
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteExerciceHasNiveau = async (req, res) => {
    try {
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
        if (req.user?.id !== userId)
            throw new ErrorApi(`You cannot access this info`, req, res, 400);
        await ExerciceHasNiveau.deleteExerciceHasNiveau(exerciceId, userId);
        return res.status(200).json(`exercice has niveau deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createExerciceHasNiveau, validateExerciceHasNiveau, niveauDownExerciceHasNiveau, deleteExerciceHasNiveau, checkNiveau, testNiveau };
//# sourceMappingURL=exerciceHasNiveauController.js.map