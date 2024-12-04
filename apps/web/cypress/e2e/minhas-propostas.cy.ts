import { FRONT_END_URL } from "./config";

describe('Just show page', () => {

  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}/minhas-propostas`);
  });

  it('Should show the page', () => {

    cy.url().should('contain', '/minhas-propostas');
  });

});