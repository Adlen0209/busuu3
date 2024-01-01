import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';
class UserHasTrainingDataMapper extends CoreDataMapper {
    tableName = 'user_has_training';
    columns = `"user_id", "training_id"`;
    async createUserHasTraining(userId, trainingId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `INSERT INTO "${this.tableName}" VALUES ($1, $2);`,
                values: [userId, trainingId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async findAllByUser(userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM "${this.tableName}" WHERE "user_id" = $1;`,
                values: [userId]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows;
        }
    }
    async deleteOneTraining(userId, trainingId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `
                             DELETE FROM "${this.tableName}"
                             WHERE "user_id" = $1
                             AND "training_id" = $2;
                             `,
                values: [userId, trainingId],
            };
            const result = await this.client.query(preparedQuery);
            return result.rowCount;
        }
    }
}
const UserHasTraining = new UserHasTrainingDataMapper(client);
export { UserHasTraining };
//# sourceMappingURL=userHasTraining.js.map