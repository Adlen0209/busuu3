import { CoreModel } from './coreModel.js';
import { Objectif } from '../datamapper/objectif.js';
class ObjectifModel extends CoreModel {
    infoNotFound = `Materiel doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Objectif.create(item);
    };
    itemsFound = () => {
        return Objectif.findAll();
    };
    itemFound = (objectifId) => {
        return Objectif.findOne(objectifId);
    };
    updateOneItem = (item) => {
        return Objectif.update(item);
    };
    deleteOneItem = (objectifId) => {
        return Objectif.delete(objectifId);
    };
}
const objectifModel = new ObjectifModel();
export { objectifModel };
//# sourceMappingURL=objectifModel.js.map