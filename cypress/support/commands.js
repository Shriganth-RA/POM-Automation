// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Papa from 'papaparse';

Cypress.Commands.add('loadCsv', (filePath) => {
  return cy.fixture(filePath).then((csvData) => {
    return new Cypress.Promise((resolve) => {
      const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
      const cleanedData = parsed.data.map(row => {
        Object.keys(row).forEach(key => {
          row[key] = row[key]?.trim(); // trim spaces
        });
        return row;
      });
      resolve(cleanedData);
    });
  });
});
