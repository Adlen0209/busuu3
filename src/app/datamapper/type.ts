import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class TypeDataMapper extends CoreDataMapper {
  tableName = 'type';
  columns = `"titre"`;

}

const Type = new TypeDataMapper(client);

export { Type };