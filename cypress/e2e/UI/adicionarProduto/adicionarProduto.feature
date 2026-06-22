Feature: Adicionar Produto ao Carrinho

  Background:
    Given que o cliente está na página inicial
  @smoke @regressao
  Scenario Outline: Cliente adiciona um produto ao carrinho em diferentes quantidades
    When ele adiciona "<quantidade>" de "1" ao carrinho
    Then o carrinho exibe 1 produto com quantidade "<quantidade>" e total "<total>"
    And o contador de itens no cabeçalho mostra "<quantidade>"

    Examples:
      | quantidade | total    |
      | 1          | R$59.00  |
      | 2          | R$118.00 |