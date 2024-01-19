import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';
class ExerciceHasSerieDataMapper extends CoreDataMapper {
    tableName = 'exercice_has_serie';
    columns = `"exercice_id", "user_id", "niveau_id", "nombre_rep", "numero_serie"`;
    async testNiveau() {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `INSERT INTO "exercice_has_serie" (user_id, niveau_id, exercice_id,  numero_serie, nombre_rep)
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
                     ehn.user_id = 2
                     AND ehn.exercice_id = 2
                
                 ;`,
                values: []
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
}
const ExerciceHasSerie = new ExerciceHasSerieDataMapper(client);
export { ExerciceHasSerie };
//# sourceMappingURL=exerciceHasSerie.js.map