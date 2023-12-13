const userSchema = {
    type: 'object',
    properties: {
        nom: { type: 'string' },
        prenom: { type: 'string' },
        email: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
        mot_de_passe: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        mot_de_passe_confirm: { type: 'string' },
    },
    required: ['email', 'mot_de_passe', 'mot_de_passe_confirm'],
    additionalProperties: false
};
const userUpdateSchema = {
    type: 'object',
    properties: {
        nom: { type: 'string' },
        prenom: { type: 'string' },
        email: { type: 'string', pattern: '^[-a-zA-Z0-9.-_]+@[\\w-]+(?:\\.[\\w-]{2,4})$' },
        mot_de_passe: { type: 'string', pattern: '^(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z]).{8,}$' },
        mot_de_passe_confirm: { type: 'string' },
    },
    required: [],
    additionalProperties: false
};
export { userSchema, userUpdateSchema };
//# sourceMappingURL=user.schema.js.map