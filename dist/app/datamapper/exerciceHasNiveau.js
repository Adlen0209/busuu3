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
}
const ExerciceHasNiveau = new ExerciceHasNiveauDataMapper(client);
export { ExerciceHasNiveau };
//# sourceMappingURL=exerciceHasNiveau.js.map