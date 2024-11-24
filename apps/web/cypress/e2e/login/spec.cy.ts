describe('Login page', () => {
  const userEmail = 'reginaldo.rossi@email.com.br';
  const userPassword = 'mycrazysecurepassword';

  beforeEach(() => {
    cy.visit('http://localhost:3001/login');
  });

  it('should log in successfully', () => {

    cy.get('input[id="email"]')
      .type(userEmail)
      .should('have.value', userEmail);

    cy.get('input[id="password"]')
      .type(userPassword)
      .should('have.value', userPassword);

    cy.get('form').submit();
    cy.contains('Falha').should('not.exist');
  });


  it('should show message of failure', () => {

    cy.get('input[id="email"]')
      .type(userEmail)
      .should('have.value', userEmail);

    cy.get('input[id="password"]')
      .type("wrongPassword")
      .should('have.value', "wrongPassword");

    cy.get('form').submit();
    cy.contains('Falha').should('be.visible');
  });

  it('should show message for empty email', () => {
    cy.get('input[id="email"]').should('be.empty'); // Check for empty email initially
    cy.get('input[id="password"]').type('anyPassword'); // Enter any password

    cy.get('form').submit();
    cy.contains('O e-mail é obrigatório').should('be.visible'); // Check for "O e-mail é obrigatório" message
  });

  it('should show message for empty password', () => {
    cy.get('input[id="email"]').type(userEmail); // Enter email
    cy.get('input[id="password"]').should('be.empty'); // Check for empty password initially

    cy.get('form').submit();
    cy.contains('A senha é obrigatória').should('be.visible'); // Check for "A senha é obrigatório" message
  });
});