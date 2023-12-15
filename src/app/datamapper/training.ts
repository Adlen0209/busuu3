//~ Import modules
import client from '../db/database.js';
import pg from 'pg';
import { CoreDataMapper } from './coreDataMapper.js';

class TrainingDataMapper extends CoreDataMapper {
  tableName = 'training';
  columns = `"titre", "detail"`;


  //& Find all articles by user
  async findAll() {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}";`,
      };

      const result = await this.client.query(preparedQuery);
      if (!result.rows[0]) return null;
      return result.rows;
    }
  }
}

const Training = new TrainingDataMapper(client);

export { Training };