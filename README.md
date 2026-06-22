# QA-Commerce

### Loja virtual Geek para simulação de testes 

## Clonando e executando em sua máquina

### Pré-requisito:

- Node.js: https://nodejs.org/en/
- Visual Studio Code (ou editor de sua preferência): https://code.visualstudio.com/download
- Git: https://git-scm.com/downloads

Via terminal, rode os seguintes comandos:
```
git clone https://github.com/Rommelfoxx/qa-commerce.git
```
```
cd qa-commerce
```

#### Para instalar as dependências:
```
npm install
```

#### Para inicializar o banco de dados:
```
npm run db
```

#### Para subir o servidor:
```
npm start
```

No console vai aparecer os endereços do site e do banco.  
O site: http://localhost:3000/  
A documentação Swagger: http://localhost:3000/api-docs/

**Credenciais padrão (admin):** `admin@admin.com` / `admin`

*Parceria: Fábio Araújo, Bruna Emerich e Tamara Fontanella*

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

Dependências de teste utilizadas:

| Pacote | Função |
|--------|--------|
| `@badeball/cypress-cucumber-preprocessor` | Suporte a arquivos `.feature` (BDD/Gherkin) |
| `@bahmutov/cypress-esbuild-preprocessor` | Bundler para compilar os step definitions |
| `@cypress/grep` | Filtro de testes por tag (`@smoke`, `@regressao`) |

Para instalar manualmente caso necessário:
```
npm install --save-dev @badeball/cypress-cucumber-preprocessor
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
npm install --save-dev @cypress/grep
```

### Configuração (`cypress.config.js`)

| Configuração | Valor |
|-------------|-------|
| `specPattern` | `cypress/e2e/**/*.{feature,cy.js}` |
| `apiUrl` (env) | `http://localhost:3000/api` |
| Browser (CI) | Chrome headless |

### Executando os testes

Abrir o Cypress interativo (recomendado para desenvolvimento):
```
npm run cypress:open
```

Rodar todos os testes em modo headless:
```
npm run cypress:run
```

Rodar uma suíte específica:
```
npx cypress run --spec "cypress/e2e/API/api-carrinho.cy.js"
npx cypress run --spec "cypress/e2e/UI/adicionarProduto/adicionarProduto.feature"
npx cypress run --spec "cypress/e2e/UI/checkOut/checkOutProduto.feature"
```

Filtrar por tag (usando `@cypress/grep`):
```
npx cypress run --env grep=@smoke
npx cypress run --env grep=@regressao
```

### Estrutura dos testes

```
cypress/
├── e2e/
│   ├── API/
│   │   └── api-carrinho.cy.js            # Testes de API do carrinho (GET, POST, DELETE)
│   └── UI/
│       ├── adicionarProduto/
│       │   ├── adicionarProduto.feature  # Cenários BDD — adicionar produto ao carrinho
│       │   └── adicionarProduto.js       # Step definitions
│       └── checkOut/
│           ├── checkOutProduto.feature   # Cenários BDD — fluxo de checkout
│           └── checkOutProduto.js        # Step definitions
├── factories/
│   ├── userFactory.js    # Geração dinâmica de dados de usuário
│   └── cardFactory.js    # Geração de dados de cartão de crédito
├── pages/                # Page Objects (HomePage, Cart, CheckOut, Menu)
└── support/
    ├── commands.js       # cy.paginaCheckOut() — setup de carrinho para checkout
    └── commandsAPI.js    # Comandos de API reutilizáveis
```

### Cenários cobertos

**API — `api-carrinho.cy.js`**
- `GET /api/carrinho/{userId}` — listar carrinho vazio e com produto
- `POST /api/carrinho` — adicionar produto, validar campos obrigatórios, duplicidade
- `DELETE /api/carrinho/{userId}/{productId}` — remover item específico
- `DELETE /api/carrinho/{userId}` — limpar carrinho completo
- Fluxo completo: adicionar → verificar → remover

**UI — Adicionar Produto** `@smoke @regressao`
- Adicionar "Moletom com capuz" ao carrinho nas quantidades 1 e 2
- Validar total exibido no carrinho (R$59,00 e R$118,00)
- Validar contador de itens no cabeçalho

**UI — Checkout**
- Checkout sem criação de conta com `credit_card`, `boleto` e `pix`
- Checkout com criação de conta com `credit_card`, `boleto` e `pix`

### Coleção Postman

Para testes manuais, importe o arquivo `tests/collection-pm.json` no Postman. A coleção cobre todos os endpoints da API configurados para `http://localhost:3000`.

---

## Pipeline CI/CD — GitHub Actions

O arquivo `.github/workflows/ci.yml` configura a execução automática dos testes no GitHub Actions.

### Quando executa

| Evento | Branches |
|--------|---------|
| Push | `main`, `dev` |
| Pull Request | `main` |

### Jobs

O pipeline roda dois jobs **em paralelo**:

```
push / pull_request
       ├── test-api   (Testes de API)
       └── test-ui    (Testes de UI — BDD)
```

**`test-api`** — Testes de API do carrinho
1. Checkout do código
2. Setup Node.js 24
3. Cache do binário do Cypress
4. `npm ci`
5. Reinicializa banco de dados limpo
6. Sobe o servidor Express em background
7. Aguarda o servidor (`wait-on`)
8. Roda `api-carrinho.cy.js`
9. Faz upload de screenshots e vídeos em caso de falha

**`test-ui`** — Testes de UI com BDD/Cucumber
1. Checkout do código
2. Setup Node.js 24
3. Cache do binário do Cypress
4. `npm ci`
5. Verifica versão do Chrome instalado
6. Reinicializa banco de dados limpo
7. Sobe o servidor Express em background
8. Aguarda o servidor (`wait-on`)
9. Roda `adicionarProduto.feature` (Chrome headless) — continua mesmo se falhar
10. Roda `checkOutProduto.feature` (Chrome headless) — continua mesmo se falhar
11. Verifica resultado de ambas as suítes e falha o job se alguma falhou
12. Faz upload de screenshots e vídeos em caso de falha

### Artifacts gerados em caso de falha

| Artifact | Conteúdo | Retenção |
|----------|----------|----------|
| `screenshots-api` | Prints das falhas nos testes de API | 7 dias |
| `videos-api` | Gravação da execução dos testes de API | 7 dias |
| `screenshots-ui` | Prints das falhas nos testes de UI | 7 dias |
| `videos-ui` | Gravação da execução dos testes de UI | 7 dias |

Os artifacts ficam disponíveis na aba **Actions → Summary → Artifacts** do GitHub.
