/// <reference types="cypress" />

describe('User searches contacts via "Search" field', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('env').then(data => globalThis.env = data);
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
  });

  it('User gets "No results found" message', () => {
    cy.get('#search').type('not-found-contact');
    cy.get('.main-table').should('have.class', 'no-results-block');
    cy.get('#search').clear();
  });

  it('User clears search data', () => {
    cy.get('#search').type('Lorem ipsum');
    cy.get('#search+button').click();
    cy.get('#search').should('have.value', '');
    cy.get('#search').clear();
  });

  it('User successfully gets contact by name', () => {
    checkSearch('name', 0);
  });

  it('User successfully gets contact by email', () => {
    checkSearch('email', 1);
  });

  function checkSearch(param, index) {
    cy.request({
        url: `${env.baseUrl}/get_contacts.php`
    }).then(res => {
      let dataArr;

      if (param === 'name') {
        dataArr = res.body.data.map(item => item.name);
      } else if (param === 'email') {
        dataArr = res.body.data.map(item => item.email);
      }

      cy.getRandom(dataArr).then(val => {
        const urlVal = val.replace(' ', '%20');
        cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=&search=${urlVal.toLowerCase()}&sort=name`).as('getRes');
        cy.get('#search').type(val);

        cy.wait('@getRes').then(() => {
          cy.get('.main-table tbody tr').each(el => {
            cy.wrap(el).children('td').eq(index).should('have.text',val);
          });
        });
      });
    });
  }
});