import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import CheckOut from '../../pages/CheckOut'
import Cart from '../../pages/Cart'
import userFactory from '../../factories/userFactory'
import cardFactory from '../../factories/cardFactory'


Given('que o carrinho contém produtos e a cliente está na página de checkout', () => {
    cy.deletarCarrinho()
    cy.adicionarProdutoCarrinho("1", 1, 1)
    Cart.visit()
    Cart.CheckOutButton().click()
    cy.wait(1000)
})
Given('o cliente preencheu todos os dados obrigatórios de entrega', () => {
    const user = userFactory.createUser()
    CheckOut.fillForm(user)
})

Given('o cliente optou por não criar uma conta', () => {
    CheckOut.criarContaCheckbox().should('be.visible')
})

Given('o cliente optou por criar uma conta', () => {
    CheckOut.criarContaCheckbox().should('be.visible').click()
})

Given('preenche {string} e {string}', (senha,confirmacao) => {
    CheckOut.senhaInputField().should('be.visible').type(senha)
    CheckOut.confirmarSenhaInputField().should('be.visible').type(confirmacao)
})

Given('o cliente aceitou os Termos e Condições', () => {
    CheckOut.concordoTermosCheckbox().should('be.visible').click()
})

When('o cliente finaliza o pedido com {string} e os dados dessa forma de pagamento', (formaDePagamento) => {
    CheckOut.paymentMethodRadio(formaDePagamento).should('be.visible').click()

    if (formaDePagamento == "credit_card") {
        const card = cardFactory.createCard()
        CheckOut.fillCardForm(card)
    }
    CheckOut.finalizarPedidoButton().click()
})

Then('o cliente vê a mensagem {string}', (mensagemSucesso) => {
    CheckOut.mensagemSucesso().contains(mensagemSucesso)
})

Then('o status do pedido mostra {string}', (statusPedido) => {
    CheckOut.mensagemSucesso().contains(statusPedido)
})

