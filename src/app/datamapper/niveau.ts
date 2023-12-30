//~ Import modules
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class NiveauDataMapper extends CoreDataMapper {
  tableName = 'niveau';
  columns = `"description", "max_rep"`;

}

const Niveau = new NiveauDataMapper(client);

export { Niveau };