import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class TrainingDataMapper extends CoreDataMapper {
    tableName = 'training';
    columns = `"titre", "detail"`;
}
const Training = new TrainingDataMapper(client);
export { Training };
//# sourceMappingURL=training.js.map