# QA Commerce — Automação de Testes

> Projeto de automação de testes desenvolvido para demonstrar boas práticas em QA, cobrindo testes de **API REST** e **UI com BDD/Cucumber** usando Cypress.

[![CI](https://github.com/Rommelfoxx/qa-commerce/actions/workflows/ci.yml/badge.svg)](https://github.com/Rommelfoxx/qa-commerce/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/Node.js-24-green)
![Cypress](https://img.shields.io/badge/Cypress-15-04C38E?logo=cypress)
![BDD](https://img.shields.io/badge/BDD-Cucumber-23D96C)

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Padrões e práticas demonstrados](#padrões-e-práticas-demonstrados)
- [Stack de automação](#stack-de-automação)
- [Configurando a aplicação](#configurando-a-aplicação)
- [Executando os testes](#executando-os-testes)
  - [Filtros por tag](#filtros-por-tag)
  - [Estrutura dos testes](#estrutura-dos-testes)
  - [Cenários cobertos](#cenários-cobertos)
  - [Relatório Mochawesome](#relatório-mochawesome)
- [Pipeline CI/CD](#pipeline-cicd)
- [Postman](#postman)
- [Autores](#autores)

---

## Sobre o projeto

Este projeto foi criado para demonstrar boas práticas de automação de testes usando Cypress. A aplicação testada é uma loja virtual Geek (projeto open source forkado), usada como **sistema sob teste (SUT)**.

O foco deste repositório é a **camada de testes**: arquitetura, organização, padrões e integração contínua.

---

## Padrões e práticas demonstrados

| Prática | Implementação |
|---------|--------------|
| Page Object Model (POM) | Classes em `cypress/pages/` encapsulam seletores e ações de UI |
| BDD com Gherkin | Arquivos `.feature` descrevem cenários em linguagem natural |
| Data Factories | `userFactory.js` e `cardFactory.js` geram dados dinâmicos por teste |
| Fixtures | `carrinho.json` para dados estáticos reutilizáveis |
| Custom Commands | `commands.js` (UI) e `commandsAPI.js` (API) com comandos reutilizáveis |
| Separação API / UI | Jobs e specs isolados por responsabilidade |
| Relatório HTML | Mochawesome gera relatório visual após cada execução |
| CI/CD | Pipeline GitHub Actions com jobs paralelos e upload de artefatos |

---

## Stack de automação

| Pacote | Função |
|--------|--------|
| `cypress` | Framework de testes E2E |
| `@badeball/cypress-cucumber-preprocessor` | Suporte a arquivos `.feature` (BDD/Gherkin) |
| `@bahmutov/cypress-esbuild-preprocessor` | Bundler para compilar step definitions |
| `@cypress/grep` | Filtro de testes por tag (`@smoke`, `@regressao`) |
| `mochawesome` | Reporter que gera JSON por spec |
| `mochawesome-merge` | Mescla múltiplos JSONs em um único arquivo |
| `mochawesome-report-generator` | Gera o relatório HTML final |

---

## Configurando a aplicação

Os testes dependem da aplicação estar em execução localmente. Siga os passos abaixo para subir o servidor antes de rodar os testes.

**Pré-requisitos:** [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/downloads)

```bash
# 1. Clonar o repositório
git clone https://github.com/Rommelfoxx/qa-commerce.git
cd qa-commerce

# 2. Instalar dependências
npm install

# 3. Inicializar o banco de dados
npm run db

# 4. Subir o servidor
npm start
```

A aplicação estará disponível em:

| Recurso | URL |
|---------|-----|
| Site | `http://localhost:3000/` |
| Documentação Swagger | `http://localhost:3000/api-docs/` |
| Credenciais padrão (admin) | `admin@admin.com` / `admin` |

---

## Executando os testes

Com o servidor rodando, execute os testes pelo terminal:

| Comando | O que faz |
|---------|-----------|
| `npm run cypress:open` | Abre o Cypress interativo (recomendado para desenvolvimento) |
| `npm run cypress:run` | Roda todos os testes em modo headless |
| `npm run cypress:api` | Roda somente os testes de API |
| `npm run cypress:e2e` | Roda somente os testes de UI |

Para rodar uma spec específica:

```bash
npx cypress run --spec "cypress/e2e/API/api-carrinho.feature"
npx cypress run --spec "cypress/e2e/UI/adicionarProduto/adicionarProduto.feature"
npx cypress run --spec "cypress/e2e/UI/checkOut/checkOutProduto.feature"
```

### Filtros por tag

Arquivos `.feature` usam `--env tags=` (Cucumber preprocessor):

```bash
npx cypress run --env tags=@api
npx cypress run --env tags=@smoke
npx cypress run --env tags=@regressao
npx cypress run --env tags="@api and @regressao"
npx cypress run --env tags="@smoke or @api"
npx cypress run --env tags="not @regressao"
```

> Arquivos `.cy.js` usam `--env grepTags=` (`@cypress/grep`). Os dois sistemas são independentes.

### Estrutura dos testes

```
cypress/
├── e2e/
│   ├── API/
│   │   ├── api-carrinho.feature    # Cenários BDD — endpoints do carrinho
│   │   └── api-carrinho.js         # Step definitions da API
│   └── UI/
│       ├── adicionarProduto/
│       │   ├── adicionarProduto.feature  # Cenários BDD — adicionar produto
│       │   └── adicionarProduto.js       # Step definitions
│       └── checkOut/
│           ├── checkOutProduto.feature   # Cenários BDD — fluxo de checkout
│           └── checkOutProduto.js        # Step definitions
├── factories/
│   ├── userFactory.js    # Geração dinâmica de dados de usuário
│   └── cardFactory.js    # Geração de dados de cartão de crédito
├── fixtures/
│   └── carrinho.json     # Dados estáticos de teste
├── pages/                # Page Objects (HomePage, Cart, CheckOut, Menu)
└── support/
    ├── commands.js       # Comandos customizados de UI
    └── commandsAPI.js    # Comandos customizados de API
```

### Cenários cobertos

**API — `api-carrinho.feature`**

| Método | Endpoint | Cenário |
|--------|----------|---------|
| `GET` | `/api/carrinho/{userId}` | Listar carrinho vazio e com produto |
| `POST` | `/api/carrinho` | Adicionar produto, validar campos obrigatórios e duplicidade |
| `DELETE` | `/api/carrinho/{userId}/{productId}` | Remover item específico |
| `DELETE` | `/api/carrinho/{userId}` | Limpar carrinho completo |
| — | Fluxo completo | Adicionar → verificar → remover |

**UI — Adicionar Produto** `@smoke @regressao`

- Adicionar "Moletom com capuz" ao carrinho nas quantidades 1 e 2
- Validar total exibido no carrinho (R$ 59,00 e R$ 118,00)
- Validar contador de itens no cabeçalho

**UI — Checkout**

- Checkout sem criação de conta com `credit_card`, `boleto` e `pix`
- Checkout com criação de conta com `credit_card`, `boleto` e `pix`

### Relatório Mochawesome

O Cypress gera um arquivo `.json` por spec durante a execução. Após os testes, os JSONs são mesclados e convertidos em um relatório HTML interativo.

**Gerar o relatório localmente:**

```bash
# Opção 1 — tudo em um comando (API + merge + HTML)
npm run test:api:report

# Opção 2 — passo a passo
npm run cypress:api
npm run report:merge
npm run report:generate
```

O relatório é salvo em `cypress/reports/html/merged.html`. Abra diretamente no navegador.

**Limpar relatórios anteriores (Windows):**

```bash
npm run report:clean
```

---

## Pipeline CI/CD

O arquivo `.github/workflows/ci.yml` executa os testes automaticamente via **GitHub Actions** a cada push ou pull request.

### Quando executa

| Evento | Branches |
|--------|----------|
| `push` | `main`, `dev` |
| `pull_request` | `main` |

### Fluxo dos jobs

Os dois jobs rodam **em paralelo**:

```
push / pull_request
       ├── test-api   → Testes de API
       └── test-ui    → Testes de UI (BDD/Cucumber)
```

**`test-api`**
1. Checkout + setup Node.js 24 + cache Cypress
2. `npm ci`
3. Reinicializa banco de dados limpo
4. Sobe o servidor Express em background e aguarda (`wait-on`)
5. Roda `api-carrinho.feature` (Chrome headless)
6. Mescla JSONs e gera relatório HTML Mochawesome
7. Upload do relatório (sempre, mesmo em falha)
8. Upload de screenshots/vídeos (somente em falha)

**`test-ui`**
1. Checkout + setup Node.js 24 + cache Cypress
2. `npm ci`
3. Reinicializa banco de dados limpo
4. Sobe o servidor Express em background e aguarda (`wait-on`)
5. Roda `adicionarProduto.feature` (continua mesmo se falhar)
6. Roda `checkOutProduto.feature` (continua mesmo se falhar)
7. Mescla JSONs e gera relatório HTML Mochawesome
8. Upload do relatório (sempre, mesmo em falha)
9. Verifica resultado final — falha o job se alguma suíte falhou
10. Upload de screenshots/vídeos (somente em falha)

### Artifacts gerados

| Artifact | Conteúdo | Quando | Retenção |
|----------|----------|--------|----------|
| `mochawesome-report-api` | Relatório HTML interativo — testes de API | Sempre | 7 dias |
| `mochawesome-report-ui` | Relatório HTML interativo — testes de UI | Sempre | 7 dias |
| `screenshots-api` | Prints de falha — API | Só em falha | 7 dias |
| `videos-api` | Gravação da execução — API | Só em falha | 7 dias |
| `screenshots-ui` | Prints de falha — UI | Só em falha | 7 dias |
| `videos-ui` | Gravação da execução — UI | Só em falha | 7 dias |

> Acesse os artifacts em **Actions → selecione o run → Artifacts**. Baixe o ZIP, extraia e abra `merged.html` no navegador.

---

## Postman

Para testes manuais da API, importe o arquivo `collection-pm.json` no Postman. A coleção cobre todos os endpoints configurados para `http://localhost:3000`.

---

## Autores

Parceria: **Fábio Araújo**, **Bruna Emerich** e **Tamara Fontanella**
