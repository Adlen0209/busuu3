import { CoreModel } from './coreModel.js';
import { ExerciceHasNiveau } from '../datamapper/index.js';

class ExerciceHasNiveauModel extends CoreModel {
  //& Properties
  infoNotFound = `ExerciceHasNiveau doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (niveauId: number, exerciceId: number, userId: number) => {
    return ExerciceHasNiveau.createExerciceHasNiveau(niveauId, exerciceId, userId);
  };

  validate = (niveauId: number, exerciceId: number, userId: number) => {
    return ExerciceHasNiveau.validateNiveau(niveauId, exerciceId, userId);
  }
//    itemsFound = (typeId: number) => {
//      return ExerciceHasNiveau.findAllByType(typeId);
//    };

    deleteOneItem = (exerciceId: number, userId: number) => {
      return ExerciceHasNiveau.deleteValidatedNiveau(exerciceId, userId );
    };
}

const exerciceHasNiveauModel = new ExerciceHasNiveauModel();
export { exerciceHasNiveauModel };