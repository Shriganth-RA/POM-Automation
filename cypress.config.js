import { defineConfig } from "cypress";
import mochawesome from "mochawesome";

export default defineConfig({
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
