//~ Import modules
import client from '../db/database.js';
import pg from 'pg';
import { CoreDataMapper } from './coreDataMapper.js';

class TrainingDataMapper extends CoreDataMapper {
  tableName = 'training';
  columns = `"titre", "detail"`;

}

const Training = new TrainingDataMapper(client);

export { Training };