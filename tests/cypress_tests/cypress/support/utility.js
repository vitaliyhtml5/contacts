//Get random value in array
Cypress.Commands.add('getRandom', arr => arr[Math.floor(Math.random()*arr.length)]);

//Clear all fields
Cypress.Commands.add('clearAll', fields => {
    cy.get(fields).each(el => cy.wrap(el).clear());
});

//Create session
Cypress.Commands.add('startSession', (user, host) => {
    cy.session(user, () => {
        cy.request({
            url: `${host}/login.php`,
            method: 'POST',
            body: { 
                email: user.email,
                password: user.password
            },
        })
        .then(res => {
            cy.setCookie('contacts_token', res.body.access.jwt);
        }),
        {
            cacheAcrossSpecs: true
        }
    });
});

//Add Contact
Cypress.Commands.add('addContact', (user, category, host) => {
    cy.request({
        url: `${host}/add_contact.php`,
        method: 'POST',
        body: { 
            name: user.name,
            email: user.email,
            category: category
        },
    });
});

//Find contact
Cypress.Commands.add('findContact', (user, host) => {
    cy.request({
        url: `${host}/get_contacts.php?page=1&page_size=10&category=&search=${user.email}&sort=name`,
        method: 'GET',
    }).then(res => res.body.data[0].id);
});

//EditContact
Cypress.Commands.add('editContact', (contactId, newUser, category, host) => {
    cy.request({
        url: `${host}/edit_contact.php`,
        method: 'PUT',
        body: { 
            name: newUser.name,
            email: newUser.email,
            category: category,
            id: contactId
        },
    });
});

//Remove Contact
Cypress.Commands.add('removeContact', (contactId, host) => {
    cy.request({
        url: `${host}/remove_contact.php?id=${contactId}`,
        method: 'DELETE',
    }).then(res => expect(res.status).eq(200)); 
});