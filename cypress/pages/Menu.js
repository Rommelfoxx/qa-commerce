class Menu{
        carrinho() { return cy.get('[href="/cart.html"]') }
        carrinhoTotal() { return cy.get('[id="cart-count"]') }

}
export default new Menu()