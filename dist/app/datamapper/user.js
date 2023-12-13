import pg from "pg";
import client from "../db/database.js";
import { CoreDataMapper } from "./coreDataMapper.js";
class UserDataMapper extends CoreDataMapper {
    tableName = "user";
    columns = `"nom", "prenom", "email", "mot_de_passe"`;
    async findUserByEmail(email) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM "${this.tableName}" WHERE "email" = $1;`,
                values: [email],
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows[0];
        }
    }
}
const User = new UserDataMapper(client);
export { User };
//# sourceMappingURL=user.js.map