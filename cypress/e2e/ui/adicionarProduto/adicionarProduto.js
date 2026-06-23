import { Given, When, Then, AfterAll } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../../pages/HomePage'
import Cart from '../../../pages/Cart'
import Menu from '../../../pages/Menu'


Given('que o cliente está na página inicial', () => {
    cy.intercept('GET', 'http://localhost:3000/api/carrinho/1').as('carrinho')
    HomePage.visit()
    cy.wait('@carrinho')
    cy.limparCarrinhoAPI()
})

When('ele adiciona {string} de {string} ao carrinho', (quantidade,produto) => {
    HomePage.productQuantity(produto).should('exist').clear().type(quantidade)
    HomePage.productList(produto).should('exist').click()
})

Then('o carrinho exibe 1 produto com quantidade {string} e total {string}', (quantidade, total) => {
    Menu.carrinho().should('exist').click()
    Cart.QuantidadeProdutoTextField().should('contain', quantidade)
    Cart.QuantidadeProdutoTextField().should('contain', total)
})

Then('o contador de itens no cabeçalho mostra {string}', (quantidade) => {
    Menu.carrinhoTotal().should('contain', quantidade)
})


