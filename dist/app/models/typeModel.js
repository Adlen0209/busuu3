import { CoreModel } from './coreModel.js';
import { Type } from '../datamapper/index.js';
class TypeModel extends CoreModel {
    infoNotFound = `Type doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Type.create(item);
    };
    itemsFound = () => {
        return Type.findAll();
    };
    itemFound = (typeId) => {
        return Type.findOne(typeId);
    };
    updateOneItem = (item) => {
        return Type.update(item);
    };
    deleteOneItem = (typeId) => {
        return Type.delete(typeId);
    };
}
const typeModel = new TypeModel();
export { typeModel };
//# sourceMappingURL=typeModel.js.map