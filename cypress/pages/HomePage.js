class HomePage {

    //Seletores
    productList(productNumber) { return cy.get(`[ data-id="${productNumber}"]`) }
    productQuantity(productNumber) { return cy.get(`[id="quantity-${productNumber}"]`) }
    //Navegação 
    visit() {
        cy.visit('http://localhost:3000/')
    }
}

export default new HomePage()