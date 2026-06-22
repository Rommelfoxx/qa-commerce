class CheckOut {

    //Seletores
    //Dados para Entrega 
    nomeInputField() { return cy.get(`[id="first-name"]`) }
    sobrenomeInputField() { return cy.get(`[id="last-name"]`) }
    enderecoInputField() { return cy.get(`[id="address"]`) }
    numeroInputField() { return cy.get(`[id="number"]`) }
    cepInputField() { return cy.get(`[id="cep"]`) }
    telefoneInputField() { return cy.get(`[id="phone"]`) }
    emailInputField() { return cy.get(`[id="email"]`) }

    //Criar conta 
    criarContaCheckbox() { return cy.get(`[id="create-account"]`) }
    senhaInputField() { return cy.get(`[id="password"]`) }
    confirmarSenhaInputField() { return cy.get(`[id="confirm-password"]`) }

    //Formas de Pagamento 
    numeroCartaoInputField() { return cy.get(`#card-number`) }
    validadeCartaoInputField() { return cy.get(`#card-expiry`) }
    cvcCartaoInputField() { return cy.get(`#card-cvc`) }
    paymentMethodRadio(formaDePagamento) {
        return cy.get(`input[name="payment-method"][value="${formaDePagamento}"]`)
    }

    //Confirmação 
    concordoTermosCheckbox() { return cy.get(`[id="terms"]`) }
    finalizarPedidoButton() { return cy.get(`[class="btn btn-primary"]`) }
    mensagemSucesso() { return cy.get(`[id="order-status"]`) }


    //Navegação
    visit() {
        cy.visit('http://localhost:3000/checkout')
    }
     
    //Preencher Forms 
    fillForm(user) {
        this.nomeInputField().type(user.name)
        this.sobrenomeInputField().type(user.sobrenome)
        this.enderecoInputField().type(user.endereco)
        this.numeroInputField().type(user.numero)
        this.cepInputField().type(user.cep)
        this.telefoneInputField().type(user.telefone)
        this.emailInputField().type(user.email)
    }

    fillCardForm(card) {
        this.numeroCartaoInputField().click().type(card.numeroCartao)
        this.validadeCartaoInputField().click().type(card.validadeCartao)
        this.cvcCartaoInputField().click().type(card.cvcCartao)
    }

}
export default new CheckOut()