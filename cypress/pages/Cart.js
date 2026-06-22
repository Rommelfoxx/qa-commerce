class Cart {

    //Seletores 
    QuantidadeProdutoTextField() { return cy.get('#cart-list') }
    CheckOutButton() { return cy.get('[class="btn btn-primary"]') }

    visit() {
        cy.visit('http://localhost:3000/cart.html')
    }

}

export default new Cart()