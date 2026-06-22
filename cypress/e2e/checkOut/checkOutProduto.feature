Feature: Checkout Simples

  Background:
    Given que o carrinho contém produtos e a cliente está na página de checkout

    # Scenario Outline: Checkout concluído sem criação de conta, em qualquer forma de pagamento


    #     And o cliente preencheu todos os dados obrigatórios de entrega
    #     And o cliente optou por não criar uma conta
    #     And o cliente aceitou os Termos e Condições
    #     When o cliente finaliza o pedido com "<forma_de_pagamento>" e os dados dessa forma de pagamento
    #     Then o cliente vê a mensagem "Obrigado pelo seu pedido"
    #     And o status do pedido mostra "Pagamento aprovado"
    #         Examples:
    #         | forma_de_pagamento |
    #         | credit_card        |
    #         | boleto             |
    #         | pix                |


    Scenario Outline: Checkout concluído com criação de conta, em qualquer forma de pagamento


        And o cliente preencheu todos os dados obrigatórios de entrega
        And o cliente optou por criar uma conta
        And preenche "Teste@83" e "Teste@83"
        And o cliente aceitou os Termos e Condições
        When o cliente finaliza o pedido com "<forma_de_pagamento>" e os dados dessa forma de pagamento
        Then o cliente vê a mensagem "Obrigado pelo seu pedido"
        And o status do pedido mostra "Pagamento aprovado"
            Examples:
            | forma_de_pagamento | 
            | credit_card        | 
            | boleto             |
            | pix                |