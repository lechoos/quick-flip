import './commands';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.on('uncaught:exception', (err) => {
  return !(err.message.includes('ResizeObserver') || err.message.includes('Hydration'));
});
