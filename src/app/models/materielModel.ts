import { CoreModel } from './coreModel.js';
import { Materiel } from '../datamapper/index.js';

class MaterielModel extends CoreModel {
  //& Properties
  infoNotFound = `Materiel doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Materiel.create(item);
  };

  itemsFound = () => {
    return Materiel.findAll();
  };

  itemFound = (materielId: number) => {
    return Materiel.findOne(materielId);
  };

  updateOneItem = (item: object) => {
    return Materiel.update(item);
  };

  deleteOneItem = (materielId: number) => {
    return Materiel.delete(materielId);
  };
}

const materielModel = new MaterielModel();
export { materielModel };