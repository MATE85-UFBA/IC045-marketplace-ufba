import { FRONT_END_URL } from "./config";
import { login } from "./setup.auth";

describe('Just show page', () => {

  beforeEach(() => {
    login("reginaldo.rossi@email.com.br", "mycrazysecurepassword");
    cy.visit(`${FRONT_END_URL}/cadastro-projetos`);
  });

  it('Should show the page', () => {

    cy.url().should('contain', '/cadastro-projetos'); 
  });

});