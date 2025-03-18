describe('Login flow', () => {
  beforeEach(() => {
    cy.task('resetDatabase');
    cy.visit('/auth/login');
  });

  it('should login a user', () => {
    cy.task('seedTestUser');

    const testUser = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    cy.get('input[id="email"]').type(testUser.email);
    cy.get('input[id="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/flashcards');
  });

  it('should show error when logging in with invalid credentials', () => {
    const invalidUser = {
      email: 'invalid@example.com',
      password: 'Password123!',
    };

    cy.get('input[id="email"]').type(invalidUser.email);
    cy.get('input[id="password"]').type(invalidUser.password);
    cy.get('button[type="submit"]').click();

    cy.get('.bg-destructive').should('contain', 'Invalid credentials');
  });

  it('should show error when submitting empty form', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[id="email"]').should('have.attr', 'aria-invalid', 'true');
    cy.get('input[id="password"]').should('have.attr', 'aria-invalid', 'true');
  });

  it('should show error when submitting with invalid email', () => {
    cy.get('input[id="email"]').type('invalid-email');
    cy.get('input[id="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.get('input[id="email"]').should('have.attr', 'aria-invalid', 'true');
  });

  it('should show error when trying to login with non-existent user', () => {
    cy.task('resetDatabase');

    cy.get('input[id="email"]').type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('input[id="password"]').type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('button[type="submit"]').click();

    cy.get('.bg-destructive').should('contain', 'Invalid credentials');
  });

  it('should handle loading state during form submission', () => {
    cy.task('seedTestUser');

    cy.get('input[id="email"]').type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('input[id="password"]').type(Cypress.env('TEST_USER_PASSWORD'));

    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]').should('be.disabled');
  });
});
