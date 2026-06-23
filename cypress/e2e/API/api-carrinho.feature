@api @regressao
Feature: API Carrinho
  Testes de API para o endpoint do carrinho de compras

  Background:
    Given o carrinho do usuário está vazio

  
  Scenario: Listar carrinho vazio retorna status 200
    When eu listo os itens do carrinho
    Then a resposta deve ter status 200

  
  Scenario: Listar carrinho com produto retorna status 200
    Given eu adicionei um produto ao carrinho
    When eu listo os itens do carrinho
    Then a resposta deve ter status 200

  
  Scenario: Adicionar produto ao carrinho retorna 201
    When eu adiciono um produto ao carrinho
    Then a resposta deve ter status 201
    And a resposta deve conter a propriedade "message"

  
  Scenario: Remover item específico do carrinho retorna 200
    Given eu adicionei um produto ao carrinho
    When eu removo o item específico do carrinho
    Then a resposta deve ter status 200
    And a resposta deve conter a propriedade "message"

 
  Scenario: Limpar todos os itens do carrinho retorna 200
    Given eu adicionei um produto ao carrinho
    When eu limpo o carrinho
    Then a resposta deve ter status 200

  @regressao @smoke
  Scenario: Fluxo completo — adicionar, verificar e remover produto
    When eu adiciono um produto ao carrinho
    Then a resposta deve ter status 201
    When eu listo os itens do carrinho
    Then a resposta deve ter status 200
    When eu limpo o carrinho
    Then a resposta deve ter status 200
