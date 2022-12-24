/// <reference types="cypress" />

describe('User removes a contact', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('contactsData').then(data => globalThis.contact = data);
    cy.fixture('category').then(data => globalThis.category = data);
    cy.fixture('env').then(data => {
      globalThis.env = data;
      cy.startSession(user, env.baseUrl);
      cy.visit('/');
      cy.addContact(contact.addUser, category[0], env.baseUrl);
    });
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
    cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=&search=${contact.addUser.email}&sort=name`).as('getRes');
    cy.get('#search').type(contact.addUser.email).wait(500);

    cy.wait('@getRes').then(() => {
      cy.get('.remove-table').click();
    });
  });

  it('User closes "Remove contact" modal window', () => {
    cy.get('.modal-btn-wrap').should('be.visible');
    cy.contains('.modal-btn-wrap button', 'Cancel').click();
    cy.get('.modal-btn-wrap').should('not.exist');
  });

  it('User successfully removes contact', () => {
    cy.findContact(contact.editUser, env.baseUrl).then(contactId => {
      cy.intercept('DELETE', `${env.baseUrl}/remove_contact.php?id=${contactId}`).as('getRes');
      cy.contains('.modal-btn-wrap button', 'Confirm').click();
      cy.wait('@getRes').then(res => {
        expect(res.response.statusCode).eq(200);
        cy.checkAlert('Contact has been removed');
        cy.get('.main-table').should('have.class', 'no-results-block');
      });
    });
  });
});