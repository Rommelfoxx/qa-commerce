const BASE_URL = Cypress.env('apiUrl')


Cypress.Commands.add('listarCarrinhoAPI', (userId) => {
  return cy.request({
    method: 'GET',
    url: `${BASE_URL}/carrinho/${userId}`,
    failOnStatusCode: false
  })
})
//Adiciona produito no carrinho 
Cypress.Commands.add('adicionarAoCarrinhoAPI', (payload) => {
  return cy.request({
    method: 'POST',
    url: `${BASE_URL}/carrinho`,
    body: payload,
    failOnStatusCode: false
  })
})
Cypress.Commands.add('removerItemCarrinhoAPI', (userId, productId) => {
  return cy.request({
    method: 'DELETE',
    url: `${BASE_URL}/carrinho/${userId}/${productId}`,
    failOnStatusCode: false
  })
})
//Deleta carrinho 
Cypress.Commands.add('limparCarrinhoAPI', (userId = 1) => {
  return cy.request({
    method: 'DELETE',
    url: `${BASE_URL}/carrinho/${userId}`,
    failOnStatusCode: false
  })
})
