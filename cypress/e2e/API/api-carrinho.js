import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor'

let dados

Before(() => {
    cy.fixture('carrinho').then((fixture) => {
        dados = fixture
    })
})

// Limpar  

Given('o carrinho do usuário está vazio', () => {
    cy.limparCarrinhoAPI(dados.usuario.userId)
})

// Criar produto

Given('eu adicionei um produto ao carrinho', () => {
    cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarComSucesso)
})

// When

When('eu listo os itens do carrinho', () => {
    cy.listarCarrinhoAPI(dados.usuario.userId).as('resposta')
})

When('eu adiciono um produto ao carrinho', () => {
    cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarComSucesso).as('resposta')
})

When('eu removo o item específico do carrinho', () => {
    cy.removerItemCarrinhoAPI(dados.usuario.userId, dados.produto.productId).as('resposta')
})

When('eu limpo o carrinho', () => {
    cy.limparCarrinhoAPI(dados.usuario.userId).as('resposta')
})

//Then

Then('a resposta deve ter status {status}', (status) => {
    cy.get('@resposta').then((response) => {
        expect(response.status).to.eq(status)
    })
})

Then('a resposta deve conter a propriedade {string}', (propriedade) => {
    cy.get('@resposta').then((response) => {
        expect(response.body).to.have.property(propriedade)
    })
})
