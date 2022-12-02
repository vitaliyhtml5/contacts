/// <reference types="cypress" />

describe('User filters contacts according to categories', () => {
  before(() => {
    cy.fixture('userData').then(data => globalThis.user = data);
    cy.fixture('env').then(data => globalThis.env = data);
    cy.fixture('category').then(data => globalThis.category = data);
  });

  beforeEach(() => {
    cy.startSession(user, env.baseUrl);
    cy.visit('/');
    cy.get('.filter .btn-primary').click();
    cy.get('.dropdown-list input[type="checkbox"]').as('checkbox');
    cy.contains('.filter-btn button', 'Apply').as('applyBtn');
  });
  
  it('User filters contacts by "Home" category', () => {
    checkCategory(category[0], 0);
  });

  it('User filters contacts by "Friends" category', () => {
    checkCategory(category[1], 1);
  });

  it('User filters contacts by "Work" category', () => {
    checkCategory(category[2], 2);
  });

  it('User filters contacts by "Other" category', () => {
    checkCategory(category[3], 3);
  });

  it('User filters contacts by a few categories', () => {
    const indexArr = getRandom(category);
    let result = false;
    cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=${category[indexArr[0]]},${category[indexArr[1]]}&search=&sort=name`).as('getResFew');
    cy.get('@checkbox').eq(indexArr[0]).check({force: true});
    cy.get('@checkbox').eq(indexArr[1]).check({force: true});
    cy.get('@applyBtn').click();

    cy.wait('@getResFew').then(() => {
      cy.get('.main-table tbody tr').find('img').each(el => {
        if (el[0].src.includes(`img/${category[indexArr[0]]}.svg`) 
            && el[0].title === category[indexArr[0]]) {
            result = true;
        } else if (el[0].src.includes(`img/${category[indexArr[1]]}.svg`)
            && el[0].title === category[indexArr[1]]) {
          result = true;
        }
  
        expect(result).to.equal(true);
      });
    });
  });

  it('User closes "Category filter" dropdown', () => {
    cy.get('.dropdown').should('not.be.hidden');
    cy.contains('.filter-btn button', 'Cancel').click();
    cy.get('.dropdown').should('be.hidden');
  });

  function checkCategory(category, index) {
    cy.intercept('GET', `${env.baseUrl}/get_contacts.php?page=1&page_size=10&category=${category}&search=&sort=name`).as('getRes');
    
    cy.get('@checkbox').eq(index).check({force: true}).should('be.checked');
    cy.get('@applyBtn').click();
    cy.get('.dropdown').should('be.hidden');
    cy.wait('@getRes').then(() => {
      cy.get('.main-table tbody tr').each(el => {
        cy.wrap(el).find('img')
        .should('have.attr', 'src', `img/${category}.svg`)
        .and('have.attr', 'title', category);
      });

      //Postcondition
      cy.get('@checkbox').each(el => {
        cy.wrap(el).uncheck({force: true}).should('not.be.checked');
      });
    });
  }

  function getRandom(arr) {
    const data = [];
    data.push(Math.floor(Math.random()*arr.length));

    for(let i = 0; i < 1; i++) {
      let val = Math.floor(Math.random()*arr.length);
      (val === data[0]) ? i = 0 : data.push(val);
    }
    return data;
  }
});