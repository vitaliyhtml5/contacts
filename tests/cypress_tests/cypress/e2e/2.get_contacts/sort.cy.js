/// <reference types="cypress" />

describe('User sorts contacts', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('env').then(data => globalThis.env = data);
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
  });

  it('User sorts contacts by name', () => {
    sortDataAsc(0, 'name');
    sortDataDesc(0, 'name');
  });

  it('User sorts contacts by email', () => {
    sortDataAsc(1, 'email');
    sortDataDesc(1, 'email');
  });

  function sortDataAsc(item, param) {
    const arrData = [];
    cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=&search=&sort=${param}`).as('getResAsc');
    cy.get('.main-table thead button').eq(item).click({force:true})
    .should('have.class', 'sort-asc');
    
    cy.wait('@getResAsc').then(() => {
      cy.get('.main-table tbody tr').each((el, index) => {
        let sorted = true;
        arrData.push(el.children('td').eq(item).text());

        if (arrData[index] > 0
            && arrData[index] > arrData[index + 1]) {
          sorted = false;
        }
        expect(sorted).to.equal(true);
      });
    });
  }

  function sortDataDesc(item, param) {
    const arrData = [];
    cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=&search=&sort=-${param}`).as('getResDesc');
    cy.get('.main-table thead button').eq(item).click({force:true})
    .should('have.class', 'sort-desc');

    cy.wait('@getResDesc').then(() => {
      cy.get('.main-table tbody tr').each((el, index) => {
        let sorted = true;
        arrData.push(el.children('td').eq(item).text());

        if (arrData[index] > 0
            && arrData[index] < arrData[index + 1]) {
          sorted = false;
        }
        expect(sorted).to.equal(true);
      });
    });
  }
});