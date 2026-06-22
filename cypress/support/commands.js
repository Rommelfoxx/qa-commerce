// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('deletarCarrinho', () => {
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:3000/api/carrinho/1/1',
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('adicionarProdutoCarrinho', (productId,quantity,userId) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/carrinho',
    body:{productId,quantity,userId}
  }).then((response) => {
    // expect(response.status).to.eq(201)
  })
})

