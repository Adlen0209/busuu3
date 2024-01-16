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

  deleteOneItem = (exerciceId: number, userId: number) => {
    return ExerciceHasNiveau.deleteValidatedNiveau(exerciceId, userId );
  };

  checkIfExist = (exerciceId: number, userId: number) => {
    return ExerciceHasNiveau.checkNiveau(exerciceId, userId);
  }
}



const exerciceHasNiveauModel = new ExerciceHasNiveauModel();
export { exerciceHasNiveauModel };