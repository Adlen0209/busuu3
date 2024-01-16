import debug from 'debug';
const logger = debug('Controller');
import { coreController } from './coreController.js';
import { exerciceHasNiveauModel } from '../models/exerciceHasNiveauModel.js';
const createExerciceHasNiveau = async (req, res) => {
    try {
        const niveauId = await coreController.paramsHandler(req, res, 'niveauId');
        const exerciceId = await coreController.paramsHandler(req, res, 'exerciceId');
        const userId = await coreController.paramsHandler(req, res, 'userId');
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
export { createExerciceHasNiveau, validateExerciceHasNiveau };
//# sourceMappingURL=exerciceHasNiveauController.js.map