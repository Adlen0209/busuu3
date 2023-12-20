import { JSONSchemaType } from 'ajv';
import { MaterielSchema } from '../app/Types/custom';

const materielSchema: JSONSchemaType<MaterielSchema> = {
  type: 'object',
  properties: {
    nom: { type: 'string' }
   
  },
  required: ['nom'],
  additionalProperties: false,
};

export { materielSchema };