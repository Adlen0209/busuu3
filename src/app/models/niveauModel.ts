import { CoreModel } from './coreModel.js';
import { Niveau } from '../datamapper/index.js';

class NiveauModel extends CoreModel {
  //& Properties
  infoNotFound = `Niveau doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Niveau.create(item);
  };

  itemsFound = () => {
    return Niveau.findAll();
  };

  itemFound = (niveauId: number) => {
    return Niveau.findOne(niveauId);
  };

  updateOneItem = (item: object) => {
    return Niveau.update(item);
  };

  deleteOneItem = (niveauId: number) => {
    return Niveau.delete(niveauId);
  };
}

const niveauModel = new NiveauModel();
export { niveauModel };