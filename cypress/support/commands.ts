/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): Chainable<void>;
      register(email: string, username: string, password: string): Chainable<void>;
      resetDatabase(): Chainable<void>;
      seedTestData(): Chainable<void>;
    }
  }
}

export {};
