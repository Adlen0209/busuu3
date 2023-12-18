import { CoreModel } from './coreModel.js';
import { Training } from '../datamapper/training.js';
class TrainingModel extends CoreModel {
    infoNotFound = `Category doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Training.create(item);
    };
    itemsFound = () => {
        return Training.findAll();
    };
    itemFound = (trainingId) => {
        return Training.findOne(trainingId);
    };
    updateOneItem = (item) => {
        return Training.update(item);
    };
    deleteOneItem = (trainingId) => {
        return Training.delete(trainingId);
    };
}
const trainingModel = new TrainingModel();
export { trainingModel };
//# sourceMappingURL=trainingModel.js.map