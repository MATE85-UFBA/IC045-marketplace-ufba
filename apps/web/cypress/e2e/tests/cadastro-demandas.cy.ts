import { FRONT_END_URL } from "../config";
import {login} from "../setup.auth";
import {companyUser, studentUser} from "../seeds";

describe('US: As company user, I want...', () => {

  beforeEach(() => {

    login(companyUser.email, companyUser.password);
    cy.visit(`${FRONT_END_URL}/cadastro-demandas`);
  });

  it('Should show the page', () => {

    cy.url().should('contain', '/cadastro-demandas'); 
  });

  it('should display validation errors when "Título" is not filled', () => {

    cy.get('textarea[name="description"]').type('This is a test description.');
    cy.get('button').contains('Cadastrar demanda').click();
    cy.get('span').contains('Titulo é obrigatório').should('be.visible');
  });

  it('should display validation errors when "Descrição" is not filled', () => {

    cy.get('input[name="name"]').type('Test Project');
    cy.get('button').contains('Cadastrar demanda').click();
    cy.get('span').contains('This field is required').should('be.visible');
  });

  it('should successfully submit the form with all fields filled', () => {

    cy.get('input[name="name"]').type('My Test Project');
    cy.get('textarea[name="description"]').type('This is a detailed description of my test project.');
    cy.get('[role="switch"][data-state="unchecked"]').click();
    cy.get('input[name="links"]').type('https://www.example.com');
    cy.get('button').contains('Cadastrar demanda').click();

    cy.contains("A demanda foi cadastrada com sucesso.").should('be.visible');
  })

});


describe('As student user, I can not access', () => {

  beforeEach(() => {

    login(studentUser.email, studentUser.password);
    cy.visit(`${FRONT_END_URL}/cadastro-demandas`);
  });

  it('Should redirect to login page', () => {

    cy.url().should('contain', '/login');
  });

});