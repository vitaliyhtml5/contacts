/// <reference types="cypress" />

describe('Guest logs in his account', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('validateData').then(data => globalThis.data = data);
    cy.fixture('env').then(data => globalThis.env = data);
  });

  beforeEach(() => {
    cy.visit('/');
    cy.contains('.btn-primary', 'Log in').as('btn');
  });

  it('[Negative] Guest tries to log in with empty fields', () => {
    cy.validateEmptyField('#email', cy.get('@btn'));
    cy.validateEmptyField('#password', cy.get('@btn'));
    cy.clearAll('.login-form input');
  });

  it('[Negative] Guest tries to log in when length of values is more than maxlength', () => {
    cy.validateMaxlength('#email', data.lengthEmail31, 30, cy.get('@btn'));
    cy.validateMaxlength('#password', data.lengthText31,  30, cy.get('@btn'));
    cy.clearAll('.login-form input');
  });

  it('[Negative] Guest tries to log in with invalid email', () => {
    cy.getRandom(data.invalidEmail).then(invalidEmail => {
      cy.validateEmail('#email', invalidEmail, cy.get('@btn'));
      cy.clearAll('.login-form input');
    });
  });

  it('[Negative] Guest tries to log in with not registered email', () => {
    cy.intercept('POST', `${env.baseUrl}/login.php`).as('getRes');
    fillAllFields(data.notRegisteredEmail, user.password);
    cy.checkAlert('Incorrect credentials', 'error');
    cy.validateCode('@getRes', 401);
    cy.clearAll('.login-form input');
  });

  it('[Negative] Guest tries to log in with registered email and incorrect password', () => {
    cy.intercept('POST', `${env.baseUrl}/login.php`).as('getRes');
    fillAllFields(user.email, data.incorrectPwd);
    cy.checkAlert('Incorrect credentials', 'error');
    cy.validateCode('@getRes', 401);
    cy.clearAll('.login-form input');
  });

  //Positive
  it('Guest unmasks password during log in', () => {
    cy.unmaskPwd('#password');
    cy.clearAll('.login-form input');
  });

  it('Guest successfully logs in', () => {
    cy.intercept('POST', `${env.baseUrl}/login.php`).as('getRes');
    fillAllFields(user.email, user.password);

    cy.wait('@getRes').then(res => {
      expect(res.response.statusCode).eq(201);
      expect(res.response.body.access.jwt).not.empty;
      cy.getCookie('contacts_token').should('exist'); 
    });
  });

  function fillAllFields(email, pwd) {
    cy.get('#email').type(email);
    cy.get('#password').type(pwd);
    cy.get('@btn').click();
  }
});