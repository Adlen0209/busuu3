import { CoreModel } from './coreModel.js';
import { Niveau } from '../datamapper/index.js';
class NiveauModel extends CoreModel {
    infoNotFound = `Niveau doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Niveau.create(item);
    };
    itemsFound = () => {
        return Niveau.findAll();
    };
    itemFound = (niveauId) => {
        return Niveau.findOne(niveauId);
    };
    updateOneItem = (item) => {
        return Niveau.update(item);
    };
    deleteOneItem = (niveauId) => {
        return Niveau.delete(niveauId);
    };
}
const niveauModel = new NiveauModel();
export { niveauModel };
//# sourceMappingURL=niveauModel.js.map