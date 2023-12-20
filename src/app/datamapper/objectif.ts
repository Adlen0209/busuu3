import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class ObjectifDataMapper extends CoreDataMapper {
  tableName = 'objectif';
  columns = `"nombre_rep", "temps"`;

}

const Objectif = new ObjectifDataMapper(client);

export { Objectif };