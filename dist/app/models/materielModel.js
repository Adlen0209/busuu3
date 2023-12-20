import { CoreModel } from './coreModel.js';
import { Materiel } from '../datamapper/materiel.js';
class MaterielModel extends CoreModel {
    infoNotFound = `Materiel doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Materiel.create(item);
    };
    itemsFound = () => {
        return Materiel.findAll();
    };
    itemFound = (materielId) => {
        return Materiel.findOne(materielId);
    };
    updateOneItem = (item) => {
        return Materiel.update(item);
    };
    deleteOneItem = (materielId) => {
        return Materiel.delete(materielId);
    };
}
const materielModel = new MaterielModel();
export { materielModel };
//# sourceMappingURL=materielModel.js.map