import { CoreModel } from './coreModel.js';
import { Exercice } from '../datamapper/index.js';

class ExerciceModel extends CoreModel {
  //& Properties
  infoNotFound = `Exercice doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Exercice.create(item);
  };

  itemsFound = () => {
    return Exercice.findAll();
  };

  itemFound = (exerciceId: number) => {
    return Exercice.findOne(exerciceId);
  };

  updateOneItem = (item: object) => {
    return Exercice.update(item);
  };

  deleteOneItem = (exerciceId: number) => {
    return Exercice.delete(exerciceId);
  };
}

const exerciceModel = new ExerciceModel();
export { exerciceModel };