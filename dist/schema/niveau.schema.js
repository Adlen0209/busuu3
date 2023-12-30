const niveauSchema = {
    type: 'object',
    properties: {
        description: { type: 'string' },
        max_rep: { type: 'number' }
    },
    required: ['description', 'max_rep'],
    additionalProperties: false,
};
export { niveauSchema };
//# sourceMappingURL=niveau.schema.js.map