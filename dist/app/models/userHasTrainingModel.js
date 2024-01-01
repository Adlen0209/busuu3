import { CoreModel } from './coreModel.js';
import { UserHasTraining } from '../datamapper/index.js';
class UserHasTrainingModel extends CoreModel {
    infoNotFound = `UserHasTraining doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (userId, trainingId) => {
        return UserHasTraining.createUserHasTraining(userId, trainingId);
    };
    itemsFound = (userId) => {
        return UserHasTraining.findAllByUser(userId);
    };
    deleteOneItem = (userId, trainingId) => {
        return UserHasTraining.deleteOneTraining(userId, trainingId);
    };
}
const userHasTrainingModel = new UserHasTrainingModel();
export { userHasTrainingModel };
//# sourceMappingURL=userHasTrainingModel.js.map