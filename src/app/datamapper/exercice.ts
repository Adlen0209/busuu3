//~ Import modules
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class ExerciceDataMapper extends CoreDataMapper {
  tableName = 'exercice';
  columns = `"titre", "detail", "illustration"`;

}

const Exercice = new ExerciceDataMapper(client);

export { Exercice };