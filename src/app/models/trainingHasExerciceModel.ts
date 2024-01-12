import { CoreModel } from './coreModel.js';
import { TrainingHasExercice } from '../datamapper/index.js';

class TrainingHasExerciceModel extends CoreModel {
  //& Properties
  infoNotFound = `TrainingHasExercice doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (trainingId: number, exerciceId: number) => {
    return TrainingHasExercice.createTrainingHasExercice(trainingId, exerciceId);
  };

    itemsFound = (trainingId: number) => {
      return TrainingHasExercice.findAllExerciceByTraining(trainingId);
    };

    deleteOneItem = (trainingId: number, exerciceId: number) => {
      return TrainingHasExercice.deleteExerciceInTraining(trainingId, exerciceId );
    };
}

const trainingHasExerciceModel = new TrainingHasExerciceModel();
export { trainingHasExerciceModel };