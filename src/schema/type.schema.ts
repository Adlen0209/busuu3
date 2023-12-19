import { JSONSchemaType } from 'ajv';
import { TypeSchema } from '../app/Types/custom';

const typeSchema: JSONSchemaType<TypeSchema> = {
  type: 'object',
  properties: {
    titre: { type: 'string' }
  },
  required: ['titre'],
  additionalProperties: false,
};

export { typeSchema };