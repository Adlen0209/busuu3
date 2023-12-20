import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class MaterielDataMapper extends CoreDataMapper {
  tableName = 'materiel';
  columns = `"nom"`;

}

const Materiel = new MaterielDataMapper(client);

export { Materiel };