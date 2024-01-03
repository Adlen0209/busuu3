import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';

class TrainingHasExerciceDataMapper extends CoreDataMapper {
  tableName = 'training_has_exercice';
  columns = `"training_id", "exercice_id"`;

    //& Associate User with Training
    async createTrainingHasExercice(trainingId: number, exerciceId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `INSERT INTO "${this.tableName}" VALUES ($1, $2);`,
                values: [trainingId, exerciceId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }


    //& Find all Exercice by training
      async findAllExerciceByTraining(trainingId: number) {
          if (this.client instanceof pg.Pool) {
            const preparedQuery = {
              text: `SELECT * FROM "${this.tableName}" WHERE "training_id" = $1;`,
              values: [trainingId]
            };
    
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0]) return null;
            return result.rows;
          }
        }


    // //& Delete One training Has type
    // async deleteTrainingHasType(trainingId: number) {
    //   if (this.client instanceof pg.Pool) {
    //     const preparedQuery = {
    //       text: `
    //                        DELETE FROM "${this.tableName}"
    //                        WHERE "training_id" = $1;
    //                        `,
    //       values: [trainingId],
    //     };
  
    //     const result = await this.client.query(preparedQuery);
  
    //     return result.rowCount;
    //   }
    // }
}

const TrainingHasExercice = new TrainingHasExerciceDataMapper(client);

export { TrainingHasExercice };