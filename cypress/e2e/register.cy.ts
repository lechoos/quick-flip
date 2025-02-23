describe('Register flow', () => {
  beforeEach(() => {
    cy.task('resetDatabase');
    cy.visit('/auth/register');
  });

  it('should register a new user', () => {
    const testUser = {
      email: 'test@example.com',
      password: 'Password123!',
      username: 'testuser',
    };

    cy.get('input[id="username"]').type(testUser.username);
    cy.get('input[id="email"]').type(testUser.email);
    cy.get('input[id="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show error when registering with existing email', () => {
    cy.task('seedTestUser');

    cy.get('input[id="username"]').type('differentuser');
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.get('.bg-destructive').should('contain', 'Email already in use');
  });

  it('should show error when registering with existing username', () => {
    cy.task('seedTestUser');

    cy.get('input[id="username"]').type('testuser');
    cy.get('input[id="email"]').type('different@example.com');
    cy.get('input[id="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.get('.bg-destructive').should('contain', 'Username already taken');
  });
});
