import { CoreModel } from './coreModel.js';
import { ExerciceHasNiveau } from '../datamapper/index.js';
class ExerciceHasNiveauModel extends CoreModel {
    infoNotFound = `ExerciceHasNiveau doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (niveauId, exerciceId, userId) => {
        return ExerciceHasNiveau.createExerciceHasNiveau(niveauId, exerciceId, userId);
    };
    validate = (niveauId, exerciceId, userId) => {
        return ExerciceHasNiveau.validateNiveau(niveauId, exerciceId, userId);
    };
    deleteOneItem = (exerciceId, userId) => {
        return ExerciceHasNiveau.deleteValidatedNiveau(exerciceId, userId);
    };
}
const exerciceHasNiveauModel = new ExerciceHasNiveauModel();
export { exerciceHasNiveauModel };
//# sourceMappingURL=exerciceHasNiveauModel.js.map