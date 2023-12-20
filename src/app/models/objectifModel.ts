
import { CoreModel } from './coreModel.js';
import { Objectif } from '../datamapper/objectif.js';

class ObjectifModel extends CoreModel {
  //& Properties
  infoNotFound = `Materiel doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Objectif.create(item);
  };

  itemsFound = () => {
    return Objectif.findAll();
  };

  itemFound = (objectifId: number) => {
    return Objectif.findOne(objectifId);
  };

  updateOneItem = (item: object) => {
    return Objectif.update(item);
  };

  deleteOneItem = (objectifId: number) => {
    return Objectif.delete(objectifId);
  };
}

const objectifModel = new ObjectifModel();
export { objectifModel };