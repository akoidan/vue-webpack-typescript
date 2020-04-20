import '@cypress/code-coverage/support'
import { register } from 'cypress-match-screenshot';
import accessTokenResponse from "../fixtures/accessTokenResponse.json"

register();

Cypress.Commands.add('signIn', () => {
  window.localStorage.setItem("session_access", accessTokenResponse.access);
  window.localStorage.setItem("session_refresh", accessTokenResponse.refresh);
  window.localStorage.setItem("session_access_exp", '1896143279'); // 2030 year
  window.localStorage.setItem("session_refresh_exp", '1896143279');
 })

Cypress.Commands.add('vType', (label, text) => {
  cy.get('.v-input').contains(label).parent().within(form => cy.get('input').clear().type(text))
})

Cypress.Commands.add('vSelect', (label, option) => {
  cy.contains(label).closest('.v-select').click();
  cy.get('.v-menu__content').contains(option).click();
})

Cypress.Commands.add('vClick', (label) => {
  cy.get('.v-btn').contains(label).click()
})

Cypress.Commands.add('vCheck', (text) => {
  cy
    .get('.v-input--checkbox')
    .contains(text)
    .closest('.v-input--checkbox')
    .get('.v-input--selection-controls__ripple')
    .click()
})

// cypress doesn't support fetch api, so stub it with polyfill and force polyfill here
Cypress.on('window:before:load', win => {
  win.fetch = null;
});

// this adds general response structure to support contract request mocking, moved it here, to avoid duplication in tests
Cypress.Commands.add('pactAddInteraction', ({state, uponReceiving, withRequest, status, responseBody}) => {
  cy.task('pactAddInteraction', {
    state,
    uponReceiving,
    withRequest,
    willRespondWith: {
      status,
      body: responseBody,
    },
  });
})

before(() => {
  // create and destroy pact server onces, even if test doesn't need it
  // this is the only way to ensure that the resulting output file is created onces
  // and we don't spend time on recreating the server all over again
  cy.task('pactCreateServer')
})

after(() =>  {
  // save result to json after tests finish
  cy.task('pactFinalize')
})

afterEach(() =>  {
  // if one test failed, we should remove interactions so it won't affect other tests.
  cy.task('pactRemoveInteractions');
})
