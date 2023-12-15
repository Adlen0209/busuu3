import { CoreModel } from './coreModel.js';
import { Training } from '../datamapper/training.js';

class TrainingModel extends CoreModel {
  //& Properties
  infoNotFound = `Category doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Training.create(item);
  };

  itemsFound = () => {
    return Training.findAll();
  };

  itemFound = (trainingId: number) => {
    return Training.findOne(trainingId);
  };

  updateOneItem = (item: object) => {
    return Training.update(item);
  };

  deleteOneItem = (trainingId: number) => {
    return Training.delete(trainingId);
  };
}

const trainingModel = new TrainingModel();
export { trainingModel };