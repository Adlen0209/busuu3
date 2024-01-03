import { CoreModel } from './coreModel.js';
import { TrainingHasType } from '../datamapper/index.js';
class TrainingHasTypeModel extends CoreModel {
    infoNotFound = `TrainingHasType doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (typeId, trainingId) => {
        return TrainingHasType.createUserHasTraining(typeId, trainingId);
    };
    itemsFound = (typeId) => {
        return TrainingHasType.findAllByType(typeId);
    };
    deleteOneItem = (trainingId) => {
        return TrainingHasType.deleteTrainingHasType(trainingId);
    };
}
const trainingHasTypeModel = new TrainingHasTypeModel();
export { trainingHasTypeModel };
//# sourceMappingURL=trainingHasTypeModel.js.map