Cypress.Commands.add('validateEmptyField', (field, btn) => {
    btn.click();     
    cy.get(field).should('have.class', 'field-err');
    cy.get(field).siblings('span').should('have.text', 'Can\'t be blank');
    cy.get(field).type('sometext').should('not.have.class', 'field-err');
    cy.get(field).siblings('span').should('not.exist');
});

Cypress.Commands.add('validateMaxlength', (field, text, length, btn)=> {
    cy.get(field).type(text);
    cy.get('input').not(field).each(el => cy.wrap(el).type('1', {force:true}));
    btn.click();
    cy.get(field).should('have.class', 'field-err');
    cy.get(field).siblings('span').should('have.text', `Max length is ${length} chars`);
    cy.get(field).clear().should('not.have.class', 'field-err');
    cy.get(field).siblings('span').should('not.exist');
    cy.get('input').not(field).each(el => cy.wrap(el).clear({force:true}));
});

Cypress.Commands.add('validateEmail', (field, email, btn)=> {
    cy.get(field).type(email);
    cy.get('input').not(field).each(el => cy.wrap(el).type('1', {force:true}));
    btn.click();
    cy.get(field).should('have.class', 'field-err');
    cy.get(field).siblings('span').should('have.text', 'Invalid email format');
    cy.get(field).clear().should('not.have.class', 'field-err');
    cy.get(field).siblings('span').should('not.exist');
});

//Validate http status code
Cypress.Commands.add('validateCode', (endpoint, code)=> {
    cy.wait(endpoint).its('response.statusCode').should('eq', code);
});