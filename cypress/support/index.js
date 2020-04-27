import '@cypress/code-coverage/support'
import { register } from 'cypress-match-screenshot';
import options from "../../build/options.json";

register();

Cypress.Commands.add('vType', (label, text) => {
  cy.get('.v-input').contains(label).parent().within(form => cy.get('input').clear().type(text))
});

Cypress.Commands.add('vSelect', (label, option) => {
  cy.contains(label).closest('.v-select').click();
  cy.get('.v-menu__content').contains(option).click();
});

Cypress.Commands.add('vClick', (label) => {
  cy.get('.v-btn').contains(label).click()
});

Cypress.Commands.add('vCheck', (text) => {
  cy
    .get('.v-input--checkbox')
    .contains(text)
    .closest('.v-input--checkbox')
    .get('.v-input--selection-controls__ripple')
    .click()
});


Cypress.Commands.add('assertCalledTimes', (alias, timesCalled) => {
  cy.state('requests').filter(call => console.log(`Call ${call.alias}`));
  expect(
    cy.state('requests').filter(call => call.alias === alias),
    `${alias} should have been called ${timesCalled} times`
  ).to.have.length(timesCalled);
});

Cypress.env('APP_API_URL', options.API_URL);

// cypress doesn't support fetch api, so stub it with polyfill and force polyfill here
Cypress.on('window:before:load', win => {
  win.fetch = null;
});
