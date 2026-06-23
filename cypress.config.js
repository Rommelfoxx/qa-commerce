// cypress.config.js
const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha/.jsons',
    overwrite: false,
    html: false,      // desativa HTML individual por spec
    json: true        // gera só JSON por spec (merge depois)
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.{feature,cy.js}',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }))

      return config
    }
  },
  env: {
    apiUrl: 'http://localhost:3000/api',
  }
})