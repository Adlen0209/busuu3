import { CoreModel } from './coreModel.js';
import { TrainingHasExercice } from '../datamapper/index.js';
class TrainingHasExerciceModel extends CoreModel {
    infoNotFound = `TrainingHasExercice doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (trainingId, exerciceId) => {
        return TrainingHasExercice.createTrainingHasExercice(trainingId, exerciceId);
    };
    itemsFound = (trainingId) => {
        return TrainingHasExercice.findAllExerciceByTraining(trainingId);
    };
    deleteOneItem = (trainingId, exerciceId) => {
        return TrainingHasExercice.deleteExerciceInTraining(trainingId, exerciceId);
    };
}
const trainingHasExerciceModel = new TrainingHasExerciceModel();
export { trainingHasExerciceModel };
//# sourceMappingURL=trainingHasExerciceModel.js.map