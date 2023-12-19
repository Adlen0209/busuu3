import { CoreModel } from './coreModel.js';
import { Type } from '../datamapper/type.js';

class TypeModel extends CoreModel {
  //& Properties
  infoNotFound = `Type doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Type.create(item);
  };

  itemsFound = () => {
    return Type.findAll();
  };

  itemFound = (typeId: number) => {
    return Type.findOne(typeId);
  };

  updateOneItem = (item: object) => {
    return Type.update(item);
  };

  deleteOneItem = (typeId: number) => {
    return Type.delete(typeId);
  };
}

const typeModel = new TypeModel();
export { typeModel };