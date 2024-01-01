const userHasTrainingSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'number' },
        training_id: { type: 'number' }
    },
    required: ['user_id', 'training_id'],
    additionalProperties: false,
};
export { userHasTrainingSchema };
//# sourceMappingURL=userHasTraining.js.map