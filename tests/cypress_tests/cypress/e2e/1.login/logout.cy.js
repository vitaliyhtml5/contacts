/// <reference types="cypress" />

describe('User logs out of his account', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('env').then(data => globalThis.env = data);
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
  });

  it('Guest successfully logs out', () => {
    cy.getCookie('contacts_token').should('exist');

    cy.intercept('DELETE', `${env.baseUrl}/logout.php`).as('getRes');
    cy.get('.logout-btn').click();

    cy.wait('@getRes').then(res => {
      expect(res.response.statusCode).eq(204);
      cy.getCookie('contacts_token').should('not.exist'); 
    });
  });
});