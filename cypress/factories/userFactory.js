

const createUser = (overrides = {}) => ({
    name: `Teste`,
    sobrenome: `sobrenome_${Date.now()}`,
    endereco: `Rua ${Date.now()}`,
    numero: `119${Math.floor(Math.random() * 90000) + 100}`,
    cep: `12345${Math.floor(Math.random() * 900) + 100}`,
    telefone: `55119${Math.floor(Math.random() * 90000000) + 10000000}`,
    email: `user_${Date.now()}@example.com`,
    ...overrides
})

export default {
    createUser
};