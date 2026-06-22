

const createCard = (overrides = {}) => ({
    numeroCartao: `1234`,
    validadeCartao: `1234`,
    cvcCartao: `123`,
    ...overrides
})

export default {
    createCard
};