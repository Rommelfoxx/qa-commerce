class HomePage {

    //Seletores
    //botao
    productList(productName) { return cy.contains('.card',productName).find('button.add-to-cart') }
    //inputField
    productQuantity(productName) { return cy.contains('.card',productName).find('input[type="number"]') }
    //Navegação 
    visit() {
        cy.visit('http://localhost:3000/')
    }
}

export default new HomePage()