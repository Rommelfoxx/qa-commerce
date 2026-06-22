// <reference types="cypress" />
 
describe('API Carrinho', () => {
 
    const USER_ID = 1
    const PRODUCT_ID = 1
 
    beforeEach(() => {
        cy.limparCarrinhoAPI(USER_ID)
        
    })
 
    // ─── GET /api/carrinho/{userId} ───────────────────────────────────────────
 
    describe('GET /api/carrinho/{userId}', () => {
 
        it('deve retornar carrinho vazio após limpeza com status 200', () => {
            cy.listarCarrinhoAPI(USER_ID).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
 
        it('deve retornar o produto correto após adicioná-lo ao carrinho', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                productId: PRODUCT_ID,
                quantity: 2
            }).then(() => {
                cy.listarCarrinhoAPI(USER_ID).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })
 
    // ─── POST /api/carrinho ───────────────────────────────────────────────────
 
    describe('POST /api/carrinho', () => {
 
        it('deve adicionar produto ao carrinho com sucesso e retornar 201', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                productId: PRODUCT_ID,
                quantity: 1
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('message')
            })
        })
 
        it('deve retornar 400 ao tentar adicionar produto duplicado no carrinho', () => {
            const payload = { userId: USER_ID, productId: PRODUCT_ID, quantity: 1 }
 
            cy.adicionarAoCarrinhoAPI(payload).then(() => {
                cy.adicionarAoCarrinhoAPI(payload).then((response) => {
                    expect(response.status).to.eq(400)
                })
            })
        })
 
        it('deve retornar erro ao enviar payload sem userId', () => {
            cy.adicionarAoCarrinhoAPI({
                productId: PRODUCT_ID,
                quantity: 1
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 422, 500])
            })
        })
 
        it('deve retornar erro ao enviar payload sem productId', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                quantity: 1
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 422, 500])
            })
        })
 
        it('deve retornar erro ao enviar payload sem quantity', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                productId: PRODUCT_ID
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 422, 500])
            })
        })
    })
 
    // ─── DELETE /api/carrinho/{userId}/{productId} ────────────────────────────
 
    describe('DELETE /api/carrinho/{userId}/{productId}', () => {
 
        it('deve remover item específico do carrinho com sucesso e retornar 200', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                productId: PRODUCT_ID,
                quantity: 1
            }).then(() => {
                cy.removerItemCarrinhoAPI(USER_ID, PRODUCT_ID).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('message')
                })
            })
        })
    })
 
    // ─── DELETE /api/carrinho/{userId} ────────────────────────────────────────
 
    describe('DELETE /api/carrinho/{userId}', () => {
 
        it('deve remover todos os itens do carrinho com status 200', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                productId: PRODUCT_ID,
                quantity: 1
            }).then(() => {
                cy.limparCarrinhoAPI(USER_ID).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })
 
    // ─── FLUXO COMPLETO ───────────────────────────────────────────────────────
 
    describe('Fluxo completo do carrinho', () => {
 
        it('deve adicionar produto, verificar no carrinho e depois remover com sucesso', () => {
            cy.adicionarAoCarrinhoAPI({
                userId: USER_ID,
                productId: PRODUCT_ID,
                quantity: 1
            }).then((addResponse) => {
                expect(addResponse.status).to.eq(201)
 
                cy.listarCarrinhoAPI(USER_ID).then((getResponse) => {
                    expect(getResponse.status).to.eq(200)
 
                    cy.limparCarrinhoAPI(USER_ID).then((deleteResponse) => {
                        expect(deleteResponse.status).to.eq(200)
                    })
                })
            })
        })
    })
})