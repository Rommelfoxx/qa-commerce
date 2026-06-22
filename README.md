# QA-Commerce

### Loja virtual Geek para simulação de testes 

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
-Git: você encontra em: https://git-scm.com/downloads

Via terminal, rode os seguintes comandos:
```  
git clone https://github.com/fabioaraujoqa/qa-commerce.git
```
```
cd qa-commerce
```

#### Para instalar as dependencias:
```
npm install 
```

#### Para subir o servidor e o banco:
```
npm start
```

No console vai aparecer os endereços do site e do banco. 
O site você acessaem: http://localhost:3000/

A documentação funciona em: http://localhost:3000/api-docs/

*Parceria: Fábio Araújo, Bruna Emerich e Tamara Fontanella

---

## Testes automatizados com Cypress

### Pré-requisito

O servidor precisa estar rodando antes de executar os testes:
```
npm start
```

### Instalação das dependências de teste

As dependências já estão incluídas no `package.json`. Basta rodar:
```
npm install
```

Cucumber =
npm install --save-dev @badeball/cypress-cucumber-preprocessor
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor

Cypress-grep
npm install --save-dev @cypress/grep


### Configuração (`cypress.config.js`)

Os testes usam a URL base da API via variável de ambiente:

| Variável | Valor padrão |
|----------|-------------|
| `apiUrl` | `http://localhost:3000/api` |

O Cypress está configurado para aceitar tanto arquivos `.feature` (BDD/Cucumber) quanto `.cy.js` (testes de API diretos).

### Executando os testes

Abrir o Cypress interativo (recomendado para desenvolvimento):
```
npm run cypress:open
```

Rodar todos os testes em modo headless (CI):
```
npm run cypress:run
```

Rodar um teste específico:
```
npx cypress run --spec "cypress/e2e/API/api-carrinho.cy.js"
npx cypress run --spec "cypress/e2e/UI/adicionarProduto/adicionarProduto.feature"
npx cypress run --spec "cypress/e2e/UI/checkOut/checkOutProduto.feature"
```

### Estrutura dos testes

```
cypress/
├── e2e/
│   ├── API/
│   │   └── api-carrinho.cy.js         # Testes de API do carrinho (GET, POST, DELETE)
│   └── UI/
│       ├── adicionarProduto/
│       │   ├── adicionarProduto.feature  # Cenários BDD - adicionar produto ao carrinho
│       │   └── adicionarProduto.js       # Step definitions
│       └── checkOut/
│           ├── checkOutProduto.feature   # Cenários BDD - fluxo de checkout (3 formas de pagamento)
│           └── checkOutProduto.js        # Step definitions
├── factories/
│   ├── userFactory.js    # Geração de dados de usuário dinâmicos
│   └── cardFactory.js    # Geração de dados de cartão de crédito
├── pages/                # Page Objects (HomePage, Cart, CheckOut, Menu)
└── support/
    ├── commands.js       # Comando cy.paginaCheckOut() para setup de UI
    └── commandsAPI.js    # Comandos de API (listarCarrinhoAPI, adicionarAoCarrinhoAPI, etc.)
```

### Cenários cobertos

**API (`api-carrinho.cy.js`)**
- GET /api/carrinho/{userId} — listar carrinho
- POST /api/carrinho — adicionar produto, campos obrigatórios, duplicidade
- DELETE /api/carrinho/{userId}/{productId} — remover item específico
- DELETE /api/carrinho/{userId} — limpar carrinho
- Fluxo completo: adicionar → verificar → remover

**UI - Adicionar Produto**
- Adicionar produto ao carrinho em diferentes quantidades (1 e 2 unidades)
- Validação do contador de itens no cabeçalho

**UI - Checkout**
- Checkout sem criação de conta (credit_card, boleto, pix)
- Checkout com criação de conta (credit_card, boleto, pix)

### Coleção Postman

Para testes manuais, importe o arquivo `tests/collection-pm.json` no Postman. A coleção contém todos os endpoints da API já configurados para `http://localhost:3000`.






