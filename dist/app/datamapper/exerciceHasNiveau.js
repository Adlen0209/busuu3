import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';
class ExerciceHasNiveauDataMapper extends CoreDataMapper {
    tableName = 'exercice_has_niveau';
    columns = `"niveau_id", "exercice_id", "user_id"`;
    async createExerciceHasNiveau(niveauId, exerciceId, userId) {
        if (this.client instanceof pg.Pool) {
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
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async validateNiveau(niveauId, exerciceId, userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `UPDATE "${this.tableName}" SET "validated" = 'true'
                WHERE niveau_id = $1
                AND exercice_id = $2
                AND user_id = $3
                ;`,
                values: [niveauId, exerciceId, userId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async checkNiveau(exerciceId, userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT niveau_id
                FROM "${this.tableName}" 
                WHERE exercice_id = $1
                AND user_id = $2
                ;`,
                values: [exerciceId, userId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async fetchSerie(exerciceId, niveauId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT "nombre_rep", "numero_serie" FROM "exercice_has_serie"
                WHERE exercice_id = $1
                AND niveau_id = $2
                ;`,
                values: [exerciceId, niveauId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async deleteValidatedNiveau(exerciceId, userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `DELETE FROM "${this.tableName}" WHERE "validated" = 'true'
                AND "exercice_id" = $1
                AND "user_id" = $2
                ;`,
                values: [exerciceId, userId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async deleteExerciceHasNiveau(exerciceId, userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `DELETE FROM "${this.tableName}" WHERE 
                "exercice_id" = $1
                AND "user_id" = $2
                ;`,
                values: [exerciceId, userId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async testNiveau(userId, exerciceId) {
        if (this.client instanceof pg.Pool) {
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
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
}
const ExerciceHasNiveau = new ExerciceHasNiveauDataMapper(client);
export { ExerciceHasNiveau };
//# sourceMappingURL=exerciceHasNiveau.js.map