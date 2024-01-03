import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';

class TrainingHasTypeDataMapper extends CoreDataMapper {
  tableName = 'training_has_type';
  columns = `"type_id", "training_id"`;

    //& Associate User with Training
    async createUserHasTraining(typeId: number, trainingId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `INSERT INTO "${this.tableName}" VALUES ($1, $2);`,
                values: [typeId, trainingId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }


    //& Find all training by type
     async findAllByType(typeId: number) {
         if (this.client instanceof pg.Pool) {
           const preparedQuery = {
             text: `SELECT * FROM "${this.tableName}" WHERE "type_id" = $1;`,
             values: [typeId]
           };
    
           const result = await this.client.query(preparedQuery);
           if (!result.rows[0]) return null;
           return result.rows;
         }
       }


    //& Delete One training Has type
    async deleteTrainingHasType(trainingId: number) {
      if (this.client instanceof pg.Pool) {
        const preparedQuery = {
          text: `
                           DELETE FROM "${this.tableName}"
                           WHERE "training_id" = $1;
                           `,
          values: [trainingId],
        };
  
        const result = await this.client.query(preparedQuery);
  
        return result.rowCount;
      }
    }
}

const TrainingHasType = new TrainingHasTypeDataMapper(client);

export { TrainingHasType };