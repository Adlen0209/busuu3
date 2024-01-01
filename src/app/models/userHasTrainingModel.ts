import { CoreModel } from './coreModel.js';
import { UserHasTraining } from '../datamapper/index.js';

class UserHasTrainingModel extends CoreModel {
  //& Properties
  infoNotFound = `UserHasTraining doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (userId: number, trainingId: number) => {
    return UserHasTraining.createUserHasTraining(userId, trainingId);
  };

  itemsFound = (userId: number) => {
    return UserHasTraining.findAllByUser(userId);
  };

  deleteOneItem = (userId: number, trainingId: number) => {
    return UserHasTraining.deleteOneTraining(userId, trainingId);
  };
}

const userHasTrainingModel = new UserHasTrainingModel();
export { userHasTrainingModel };