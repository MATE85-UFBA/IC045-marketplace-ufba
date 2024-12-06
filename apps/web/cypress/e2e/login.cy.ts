import { FRONT_END_URL } from "./config";

describe('Login page', () => {
  const userEmail = 'reginaldo.rossi@email.com.br';
  const userPassword = 'mycrazysecurepassword';

  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}/login`);
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
    cy.contains('Usuário ou senha incorretos.').should('be.visible');
  });

  it('should show message for empty email', () => {
    cy.get('input[id="email"]').should('be.empty');
    cy.get('input[id="password"]').type('anyPassword');

    cy.get('form').submit();
    cy.contains('O e-mail é obrigatório').should('be.visible'); 
  });

  it('should show message for empty password', () => {
    cy.get('input[id="email"]').type(userEmail)
    cy.get('input[id="password"]').should('be.empty');

    cy.get('form').submit();
    cy.contains('A senha é obrigatória').should('be.visible');
  });

  it('Go to forgot password', () => {
    cy.get('a[href="/recuperar-senha"]').click(); 
    cy.url().should('contain', '/recuperar-senha'); 
  });

  it('Go to register', () => {
    cy.get('a[href="/user-register"]').click(); 
    cy.url().should('contain', '/user-register'); 
  });
});