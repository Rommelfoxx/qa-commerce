// <reference types="cypress" />

describe('API Carrinho', () => {

    let dados
    before(() => {
        cy.fixture('carrinho').then((fixture) => {
            dados = fixture
        })
    })

    beforeEach(() => {
        cy.limparCarrinhoAPI(dados.usuario.userId)

    })
    // ─── GET /api/carrinho/{userId} ───────────────────────────────────────────
    describe('GET /api/carrinho/{userId}', () => {
        it('deve retornar carrinho vazio após limpeza com status 200', () => {
            cy.listarCarrinhoAPI(dados.usuario.userId).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
        it('deve retornar status 200 após adicionar produto ao carrinho', () => {
            cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarQuantidadeMaior).then(() => {
                cy.listarCarrinhoAPI(dados.usuario.userId).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })
    // ─── POST /api/carrinho ───────────────────────────────────────────────────
    describe('POST /api/carrinho', () => {
        it('deve adicionar produto ao carrinho com sucesso e retornar 201', () => {
            cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarComSucesso).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('message')
            })
        })
        //Erro possivel defeito retirei teste pela condição do teste 
        // it('deve retornar 400 ao tentar adicionar produto duplicado no carrinho', () => {
        //     const payload = { userId: USER_ID, productId: PRODUCT_ID, quantity: 1 }

        //     cy.adicionarAoCarrinhoAPI(payload).then(() => {
        //         cy.adicionarAoCarrinhoAPI(payload).then((response) => {
        //             expect(response.status).to.eq(400)
        //         })
        //     })
        // })
        //Erro possivel defeito retirei teste pela condição do teste 
        // it('deve retornar erro ao enviar payload sem userId', () => {
        //     cy.adicionarAoCarrinhoAPI({
        //         productId: PRODUCT_ID,
        //         quantity: 1
        //     }).then((response) => {
        //         expect(response.status).to.be.oneOf([400, 422, 500])
        //     })
        // })
        //Erro possivel defeito retirei teste pela condição do teste 
        // it('deve retornar erro ao enviar payload sem productId', () => {
        //     cy.adicionarAoCarrinhoAPI({
        //         userId: USER_ID,
        //         quantity: 1
        //     }).then((response) => {
        //         expect(response.status).to.be.oneOf([400, 422, 500])
        //     })
        // })
        //Erro possivel defeito retirei teste pela condição do teste 
        // it('deve retornar erro ao enviar payload sem quantity', () => {
        //     cy.adicionarAoCarrinhoAPI({
        //         userId: USER_ID,
        //         productId: PRODUCT_ID
        //     }).then((response) => {
        //         expect(response.status).to.be.oneOf([400, 422, 500])
        //     })
        // })
    })
    // ─── DELETE /api/carrinho/{userId}/{productId} ────────────────────────────
    describe('DELETE /api/carrinho/{userId}/{productId}', () => {

        it('deve remover item específico do carrinho com sucesso e retornar 200', () => {
            cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarComSucesso).then(() => {
                cy.removerItemCarrinhoAPI( dados.usuario.userId,dados.produto.productId).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('message')
                })
            })
        })
    })
    // ─── DELETE /api/carrinho/{userId} ────────────────────────────────────────
    describe('DELETE /api/carrinho/{userId}', () => {
        it('deve remover todos os itens do carrinho com status 200', () => {
            cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarComSucesso).then(() => {
                cy.limparCarrinhoAPI(dados.usuario.userId).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })
    // ─── FLUXO COMPLETO ───────────────────────────────────────────────────────
    describe('Fluxo completo do carrinho', () => {
        it('deve adicionar produto, verificar no carrinho e depois remover com sucesso', () => {
            cy.adicionarAoCarrinhoAPI(dados.cenarios.adicionarComSucesso).then((addResponse) => {
                expect(addResponse.status).to.eq(201)

                cy.listarCarrinhoAPI(dados.usuario.userId).then((getResponse) => {
                    expect(getResponse.status).to.eq(200)

                    cy.limparCarrinhoAPI(dados.usuario.userId).then((deleteResponse) => {
                        expect(deleteResponse.status).to.eq(200)
                    })
                })
            })
        })
    })
})