import { FRONT_END_URL } from "./config";

describe('Just show page', () => {

  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}/encontrar-grupo-pesquisa`);
  });

  it('Should show the page', () => {

    cy.url().should('contain', '/encontrar-grupo-pesquisa'); 
  });

});