const {By, Key, Builder, until} = require('selenium-webdriver');
const request = require('request');
const utility = require('../../support/utility');
const userData = require('../../fixtures/userData');
const contactsData = require('../../fixtures/contactsData');

describe('User removes a contact', () => {
    const userTestData = userData();
    const contactsTestData = contactsData();
    let driver;
    let token;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({implicit: 500});
        request({
            url : 'http://localhost/app/contacts/api/login.php',
            method :'POST',
            headers : {
              'Content-type': 'application/json',
            },
            body: {
              'email': userTestData.email,
              'password': userTestData.password
            },
            json: true
        }, (err, res) => token = res.body.access.jwt);

        await driver.get('http://localhost/app/contacts/');
        await driver.manage().addCookie({name: 'contacts_token', value: token});
    });

    it('User successfully removes contact', async () => {
        await driver.get('http://localhost/app/contacts/');
        await utility.addUser(contactsTestData[0].name, contactsTestData[0].email, driver);
        driver.wait(until.elementLocated(By.css(`button[aria-label="Remove ${contactsTestData[0].name}"]`)), 1000);
        await utility.removeUser(contactsTestData[0].name, driver);
    });

    after(() => driver && driver.quit());
});