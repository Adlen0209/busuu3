const exerciceSchema = {
    type: 'object',
    properties: {
        titre: { type: 'string' },
        detail: { type: 'string' },
        illustration: { type: 'string' }
    },
    required: ['titre', 'detail', 'illustration'],
    additionalProperties: false,
};
export { exerciceSchema };
//# sourceMappingURL=exercice.schema.js.map