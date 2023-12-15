import { JSONSchemaType } from 'ajv';
import { TrainingSchema } from '../app/Types/custom';

const trainingSchema: JSONSchemaType<TrainingSchema> = {
  type: 'object',
  properties: {
    titre: { type: 'string' },
    detail: { type: 'string' }
  },
  required: ['titre', 'detail'],
  additionalProperties: false,
};

export { trainingSchema };