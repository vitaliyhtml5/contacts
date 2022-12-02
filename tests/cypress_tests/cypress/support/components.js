// Alert messages
Cypress.Commands.add('checkAlert', (text, type) => {
    cy.get('.alert p').should('have.text', text);
    if (type === 'error') {
        cy.get('.alert').should('have.class', 'alert-err');
    } else {
        cy.get('.alert').should('not.have.class', 'alert-err');
    }
    cy.get('.alert').should('be.visible').wait(2500).and('not.exist');
});

//Unmask password field
Cypress.Commands.add('unmaskPwd', field => {
    cy.get(field).siblings('i').click({force: true});
    cy.get(field).should('have.attr', 'type', 'text');
    cy.get(field).siblings('i').click({force: true});
    cy.get(field).should('have.attr', 'type', 'password');
});