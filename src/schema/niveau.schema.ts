import { JSONSchemaType } from 'ajv';
import { NiveauSchema } from '../app/Types/custom';

const niveauSchema: JSONSchemaType<NiveauSchema> = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    max_rep: { type: 'number'}
   
  },
  required: ['description', 'max_rep'],
  additionalProperties: false,
};

export { niveauSchema };