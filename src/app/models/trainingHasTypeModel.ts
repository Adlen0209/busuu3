import { CoreModel } from './coreModel.js';
import { TrainingHasType } from '../datamapper/index.js';

class TrainingHasTypeModel extends CoreModel {
  //& Properties
  infoNotFound = `TrainingHasType doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (typeId: number, trainingId: number) => {
    return TrainingHasType.createUserHasTraining(typeId, trainingId);
  };

   itemsFound = (typeId: number) => {
     return TrainingHasType.findAllByType(typeId);
   };

   deleteOneItem = (trainingId: number) => {
     return TrainingHasType.deleteTrainingHasType(trainingId );
   };
}

const trainingHasTypeModel = new TrainingHasTypeModel();
export { trainingHasTypeModel };