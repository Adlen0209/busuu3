import { CoreModel } from './coreModel.js';
import { Exercice } from '../datamapper/index.js';
class ExerciceModel extends CoreModel {
    infoNotFound = `Exercice doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Exercice.create(item);
    };
    itemsFound = () => {
        return Exercice.findAll();
    };
    itemFound = (exerciceId) => {
        return Exercice.findOne(exerciceId);
    };
    updateOneItem = (item) => {
        return Exercice.update(item);
    };
    deleteOneItem = (exerciceId) => {
        return Exercice.delete(exerciceId);
    };
}
const exerciceModel = new ExerciceModel();
export { exerciceModel };
//# sourceMappingURL=exerciceModel.js.map