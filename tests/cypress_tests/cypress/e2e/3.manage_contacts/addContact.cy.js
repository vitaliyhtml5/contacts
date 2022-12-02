/// <reference types="cypress" />

describe('User adds a new contact', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('contactsData').then(data => globalThis.contact = data);
    cy.fixture('validateData').then(data => globalThis.data = data);
    cy.fixture('category').then(data => globalThis.category = data);
    cy.fixture('env').then(data => globalThis.env = data);
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
    cy.contains('.btn-add-item', 'Add word').click();
    cy.contains('.modal-btn-wrap button', 'Confirm').as('btn');
  });

  it('[Negative] User tries to add contact with not chosen category', () => {
    cy.get('@btn').click();
    cy.get('.err-text-expanded').should('have.text', 'Choose category');
  });

  it('[Negative] User tries to add contact with empty fields', () => {
    chooseCategory(1);
    cy.validateEmptyField('.modal #name', cy.get('@btn'));
    cy.validateEmptyField('.modal #email', cy.get('@btn'));
    cy.clearAll('.form-menu-expanded input');
  });

  it('[Negative] User tries to add contact when length of values is more than maxlength', () => {
    chooseCategory(1);
    cy.validateMaxlength('#name', data.lengthText31, 30, cy.get('@btn'));
    cy.validateMaxlength('#email', data.lengthEmail31,  30, cy.get('@btn'));
    cy.clearAll('.form-menu-expanded input');
  });

  it('[Negative] User tries to add contact with invalid email', () => {
    chooseCategory(1);
    cy.getRandom(data.invalidEmail).then(invalidEmail => {
      cy.validateEmail('#email', invalidEmail, cy.get('@btn'));
      cy.clearAll('.form-menu-expanded input');
    });
  });

  //Positive
  it('User closes "Add contact" modal window', () => {
    cy.get('.modal-btn-wrap').should('be.visible');
    cy.contains('.modal-btn-wrap button', 'Cancel').click();
    cy.get('.modal-btn-wrap').should('not.exist');
  });

  it('User successfully adds contact', () => {
    cy.intercept('POST', `${env.baseUrl}/add_contact.php`).as('getRes');
    cy.getRandom(category).then(val => {
      val = val.charAt(0).toUpperCase() + val.slice(1);
      cy.get('.item-chosen').click();
      cy.contains('.menu-expanded li', val).click();
      cy.get('.item-chosen').should('have.text', val);
    });
    cy.get('#name').type(contact.addUser.name);
    cy.get('#email').type(contact.addUser.email);
    cy.get('@btn').click();
    cy.wait('@getRes').then(res => {
      expect(res.response.statusCode).eq(201);
      cy.checkAlert('Contact has been added');
    });

    //Postcondition
    cy.findContact(contact.addUser, env.baseUrl).then(contactId => {
      cy.removeContact(contactId, env.baseUrl);
    });
  });

  function chooseCategory(item) {
    cy.get('.item-chosen').click();
    cy.get('.menu-expanded li').eq(item).click();
  }
});