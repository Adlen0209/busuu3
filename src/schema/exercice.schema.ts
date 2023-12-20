import { JSONSchemaType } from 'ajv';
import { ExerciceSchema } from '../app/Types/custom';

const exerciceSchema: JSONSchemaType<ExerciceSchema> = {
  type: 'object',
  properties: {
    titre: { type: 'string' },
    detail: {type: 'string'},
    illustration: {type : 'string'}
  },
  required: ['titre', 'detail', 'illustration'],
  additionalProperties: false,
};

export { exerciceSchema };