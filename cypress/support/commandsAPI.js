const BASE_URL = Cypress.env('apiUrl')

//Deleta carrinho 
Cypress.Commands.add('deletarCarrinhoAPI', () => {
  cy.request({
    method: 'DELETE',
    url: `${BASE_URL}/carrinho/1`,
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

//Adiciona produito no carrinho 
Cypress.Commands.add('adicionarProdutoCarrinhoAPI', (productId,quantity,userId) => {
  cy.request({
    method: 'POST',
    url: `${BASE_URL}/carrinho`,
    body:{productId,quantity,userId}
  }).then((response) => {
    // expect(response.status).to.eq(201)
  })
})


Cypress.Commands.add('listarCarrinhoAPI', (userId) => {
  return cy.request({
      method: 'GET',
      url: `${BASE_URL}/carrinho/${userId}`,
      failOnStatusCode: false
  })
})

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

Cypress.Commands.add('limparCarrinhoAPI', (userId) => {
  return cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/carrinho/${userId}`,
      failOnStatusCode: false
  })
})
