/// <reference types="cypress" />

describe('User edits a contact', () => {
  Cypress.on('uncaught:exception', (err, runnable) =>  false);
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('contactsData').then(data => globalThis.contact = data);
    cy.fixture('category').then(data => globalThis.category = data);
    cy.fixture('env').then(data => globalThis.env = data);
    cy.fixture('validateData').then(data => {
      globalThis.data = data;
      cy.startSession(user, env.baseUrl);
      cy.visit('/');
      cy.addContact(contact.addUser, category[0], env.baseUrl);
    });
  });
  
  after(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
    cy.findContact(contact.addUser, env.baseUrl).then(contactId => {
      cy.removeContact(contactId, env.baseUrl);
    });
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
    cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=&search=${contact.addUser.email}&sort=name`).as('getRes');
    cy.get('#search').type(contact.addUser.email).wait(500);

    cy.wait('@getRes').then(() => {
      cy.get('.edit-table').click();
      cy.contains('.modal-btn-wrap button', 'Confirm').as('btn');
    });
  });

  it('[Negative] User tries to edit contact with empty fields', () => {
    cy.clearAll('.form-menu-expanded input');
    cy.validateEmptyField('.modal #name', cy.get('@btn'));
    cy.validateEmptyField('.modal #email', cy.get('@btn'));
  });

  it('[Negative] User tries to edit contact when length of values is more than maxlength', () => {
    cy.clearAll('.form-menu-expanded input');
    cy.validateMaxlength('#name', data.lengthText31, 30, cy.get('@btn'));
    cy.validateMaxlength('#email', data.lengthEmail31,  30, cy.get('@btn'));
    cy.clearAll('.form-menu-expanded input');
  });

  it('[Negative] User tries to edit contact with invalid email', () => {
    cy.clearAll('.form-menu-expanded input');
    cy.getRandom(data.invalidEmail).then(invalidEmail => {
      cy.validateEmail('#email', invalidEmail, cy.get('@btn'));
      cy.clearAll('.form-menu-expanded input');
    });
  });

  //Positive
  it('User closes "Edit contact" modal window', () => {
    cy.get('.modal-btn-wrap').should('be.visible');
    cy.contains('.modal-btn-wrap button', 'Cancel').click();
    cy.get('.modal-btn-wrap').should('not.exist');
  });

  it('User successfully edits contact', () => {
    cy.intercept('PUT', `${env.baseUrl}/edit_contact.php`).as('getRes');
    cy.clearAll('.form-menu-expanded input');
    cy.get('#name').type(contact.editUser.name);
    cy.get('#email').type(contact.editUser.email);
    cy.get('@btn').click();
    cy.wait('@getRes').then(res => {
      expect(res.response.statusCode).eq(200);
      cy.checkAlert('Contact has been updated');
    });

    //Postcondition
    cy.findContact(contact.editUser, env.baseUrl).then(contactId => {
      cy.editContact(contactId, contact.addUser, category[0], env.baseUrl);
    });
  });
});