import { FRONT_END_URL } from "./config";

describe('User Registration Page', () => {
    const { v4: uuid } = require('uuid');
  
    beforeEach(() => {
      cy.visit(`${FRONT_END_URL}/user-register`);
    });
  
    it('should register a new user successfully with a random email', () => {
      const randomEmail = `${uuid()}@email.com`;
  
      cy.get('input[placeholder="Digite seu nome"]').type('Test User');
      cy.get('input[placeholder="Digite seu e-mail"]').type(randomEmail);
      cy.get('input[placeholder="Digite sua senha"]').type('TestPassword123!');
      cy.get('input[placeholder="Confirme sua senha"]').type('TestPassword123!');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('not.contain', '/register');
    });
  
    it('should show an error for duplicate email registration', () => {
      const existingEmail = 'reginaldo.rossi@email.com.br';
  
      cy.get('input[placeholder="Digite seu nome"]').type('Test User');
      cy.get('input[placeholder="Digite seu e-mail"]').type(existingEmail);
      cy.get('input[placeholder="Digite sua senha"]').type('TestPassword123!');
      cy.get('input[placeholder="Confirme sua senha"]').type('TestPassword123!');
      cy.get('button[type="submit"]').click();
  
      cy.contains('já cadastrado').should('exist');
    });

    it('should show error for missing name', () => {
        const randomEmail = `${uuid()}@email.com`;

        cy.get('input[placeholder="Digite seu nome"]').type(' ');
        cy.get('input[placeholder="Digite seu e-mail"]').type(randomEmail);
        cy.get('input[placeholder="Digite sua senha"]').type('TestPassword123!');
        cy.get('input[placeholder="Confirme sua senha"]').type('TestPassword123!');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Nome é obrigatório').should('exist');
      });
    
      it('should show error for missing email', () => {
        cy.get('input[placeholder="Digite seu nome"]').type('Test User');
        cy.get('input[placeholder="Digite seu e-mail"]').type(' ');
        cy.get('input[placeholder="Digite sua senha"]').type('TestPassword123!');
        cy.get('input[placeholder="Confirme sua senha"]').type('TestPassword123!');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Email inválido').should('exist');
      });
    
      it('should show error for missing password', () => {
        const randomEmail = `${uuid()}@email.com`;
        
        cy.get('input[placeholder="Digite sua senha"]').type(' ');
        cy.get('input[placeholder="Digite seu nome"]').type('Test User');
        cy.get('input[placeholder="Digite seu e-mail"]').type(randomEmail);
        cy.get('input[placeholder="Confirme sua senha"]').type('TestPassword123!');
        cy.get('button[type="submit"]').click();
    
        cy.contains('A senha deve ter pelo menos 8 caracteres').should('exist');
      });
    
      it('should show error for invalid email format', () => {
        cy.get('input[placeholder="Digite seu nome"]').type('Test User');
        cy.get('input[placeholder="Digite seu e-mail"]').type('invalid-email');
        cy.get('input[placeholder="Digite sua senha"]').type('TestPassword123!');
        cy.get('input[placeholder="Confirme sua senha"]').type('TestPassword123!');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Email inválido').should('exist');
      });
    
      it('should show error for invalid password format', () => {
        const randomEmail = `${uuid()}@email.com`;
    
        cy.get('input[placeholder="Digite seu nome"]').type('Test User');
        cy.get('input[placeholder="Digite seu e-mail"]').type(randomEmail);
        cy.get('input[placeholder="Digite sua senha"]').type('password');
        cy.get('input[placeholder="Confirme sua senha"]').type('password');
        cy.get('button[type="submit"]').click();
    
        cy.contains('A senha deve ter pelo menos 8 caracteres').should('exist');
      });
    
      it('should show error for non-matching passwords', () => {
        const randomEmail = `${uuid()}@email.com`;
    
        cy.get('input[placeholder="Digite seu nome"]').type('Test User');
        cy.get('input[placeholder="Digite seu e-mail"]').type(randomEmail);
        cy.get('input[placeholder="Digite sua senha"]').type('TestPassword123!');
        cy.get('input[placeholder="Confirme sua senha"]').type('DifferentPassword123!');
        cy.get('button[type="submit"]').click();
    
        cy.contains('As senhas não estão iguais.').should('exist');
      });
      
  });