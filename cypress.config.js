const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "chromeWebSecurity": false,
  "viewportWidth": 1980,
  "viewportHeight": 1280,
  e2e: {
    baseUrl: 'https://www.mall.cz/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
