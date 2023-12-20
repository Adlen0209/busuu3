import { JSONSchemaType } from 'ajv';
import { ObjectifSchema } from '../app/Types/custom';

const objectifSchema: JSONSchemaType<ObjectifSchema> = {
  type: 'object',
  properties: {
    nombre_rep: { type: 'number' },
    temps: { type: 'number' }
  },
  required: [],
  additionalProperties: false,
};

export { objectifSchema };