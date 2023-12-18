const trainingSchema = {
    type: 'object',
    properties: {
        titre: { type: 'string' },
        detail: { type: 'string' }
    },
    required: ['titre', 'detail'],
    additionalProperties: false,
};
export { trainingSchema };
//# sourceMappingURL=training.schema.js.map