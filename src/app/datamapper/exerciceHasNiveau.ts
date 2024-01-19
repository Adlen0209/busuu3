import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';

class ExerciceHasNiveauDataMapper extends CoreDataMapper {
  tableName = 'exercice_has_niveau';
  columns = `"niveau_id", "exercice_id", "user_id"`;

    //& Associate exercice aznd niveau by user
    async createExerciceHasNiveau(niveauId: number, exerciceId: number, userId: number) {
        if(this.client instanceof pg.Pool) {

            //~ Create niveau for exercice by user IF niveau doesn't exist already
            const preparedQuery = {
                text: `INSERT INTO "${this.tableName}" (niveau_id, exercice_id, user_id)
                 SELECT $1, $2, $3
                 WHERE NOT EXISTS (
                    SELECT 1
                    FROM "${this.tableName}"
                    WHERE niveau_id = $1
                    AND exercice_id = $2
                    AND user_id = $3
                 )
                 RETURNING niveau_id, exercice_id, user_id;`,
                values: [niveauId, exerciceId, userId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }


    //& Validate niveau by user
    async validateNiveau(niveauId: number, exerciceId: number, userId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `UPDATE "${this.tableName}" SET "validated" = 'true'
                WHERE niveau_id = $1
                AND exercice_id = $2
                AND user_id = $3
                ;`,
                values: [niveauId, exerciceId, userId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

    
    //& Validate niveau by user
    async checkNiveau(exerciceId: number, userId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT niveau_id
                FROM "${this.tableName}" 
                WHERE exercice_id = $1
                AND user_id = $2
                ;`,
                values: [exerciceId, userId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

    //& Fetch all serie
    async fetchSerie(exerciceId: number, niveauId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT "nombre_rep", "numero_serie" FROM "exercice_has_serie"
                WHERE exercice_id = $1
                AND niveau_id = $2
                ;`,
                values : [exerciceId, niveauId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

    //& Delete after validation
    async deleteValidatedNiveau( exerciceId: number, userId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `DELETE FROM "${this.tableName}" WHERE "validated" = 'true'
                AND "exercice_id" = $1
                AND "user_id" = $2
                ;`,
                values: [exerciceId, userId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

    async deleteExerciceHasNiveau( exerciceId: number, userId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `DELETE FROM "${this.tableName}" WHERE 
                "exercice_id" = $1
                AND "user_id" = $2
                ;`,
                values: [exerciceId, userId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

     //& TEST
     async testNiveau(userId: number, exerciceId: number) {
        if(this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `INSERT INTO "exercice_has_serie" (user_id, niveau_id, exercice_id, numero_serie, nombre_rep)
                SELECT
                    ehn.user_id,
                    ehn.niveau_id,
                    ehn.exercice_id,
                    s.numero_serie,
                    s.nombre_rep
                FROM
                    exercice_has_niveau AS ehn
                JOIN
                    serie AS s ON ehn.niveau_id = s.niveau_id
                          AND ehn.exercice_id = s.exercice_id
                WHERE
                    ehn.user_id = $1
                    AND ehn.exercice_id = $2
                    RETURNING numero_serie, nombre_rep
                ;`,
                values: [userId, exerciceId]
            }
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

    // //& Find all training by type
    //  async findAllByType(typeId: number) {
    //      if (this.client instanceof pg.Pool) {
    //        const preparedQuery = {
    //          text: `SELECT * FROM "${this.tableName}" WHERE "type_id" = $1;`,
    //          values: [typeId]
    //        };
    
    //        const result = await this.client.query(preparedQuery);
    //        if (!result.rows[0]) return null;
    //        return result.rows;
    //      }
    //    }


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

const ExerciceHasNiveau = new ExerciceHasNiveauDataMapper(client);

export { ExerciceHasNiveau };