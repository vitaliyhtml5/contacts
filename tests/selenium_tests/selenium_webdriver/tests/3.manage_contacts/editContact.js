const {By, Key, Builder, until} = require('selenium-webdriver');
const request = require('request');
const validation = require('../../support/validation');
const utility = require('../../support/utility');
const userData = require('../../fixtures/userData');
const contactsData = require('../../fixtures/contactsData');
const validateData = require('../../fixtures/validateData');

describe('User edits a new contact', () => {
    const userTestData = userData();
    const contactsTestData = contactsData();
    const testData = validateData();
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

    beforeEach(async () => {
        await driver.get('http://localhost/app/contacts/');
    });

    it('[Negative] User tries to edit contact with empty fields', async () =>  {
        await openModal();
        await validation.validateEmptyField('#check-name', '.modal-btn-wrap .btn-primary', driver);
        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[1].name);
        await validation.validateEmptyField('#check-email', '.modal-btn-wrap .btn-primary', driver);
    });

    it('[Negative] User tries to edit contact when length of values is more than maxlength', async () => {
        await openModal();
        await driver.findElement(By.css('#email')).sendKeys(contactsTestData[1].email);
        await validation.validateMaxlength('#name', '#check-name', testData.lengthText31, 30, '.modal-btn-wrap .btn-primary', driver);
        await utility.clearAllFields('.modal input', driver);

        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[1].name);
        await validation.validateMaxlength('#email', '#check-email', testData.lengthEmail31, 30, '.modal-btn-wrap .btn-primary', driver);
    });

    it('[Negative] User tries to edit contact with invalid email', async () => {
        await openModal();
        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[1].name);
        await validation.validateEmail('#email', '#check-email', '.modal-btn-wrap .btn-primary', driver);
    });

    //Positive
    it('User successfully edits contact', async () => {
        await utility.addUser(contactsTestData[0].name, contactsTestData[0].email, driver);
        driver.wait(until.elementLocated(By.css(`button[aria-label="Edit ${contactsTestData[0].name}"]`)), 1000);
        await openModal();
        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[1].name);
        await driver.findElement(By.css('#email')).sendKeys(contactsTestData[1].email);
        await driver.findElement(By.css('.modal-btn-wrap .btn-primary')).click();
        
        //Postcondition
        driver.wait(until.elementLocated(By.css(`button[aria-label="Remove ${contactsTestData[1].name}"]`)), 1000);
        await utility.removeUser(contactsTestData[1].name, driver);
    });

    after(() => driver && driver.quit());

    async function openModal() {
        await driver.findElement(By.css('.edit-table:first-child')).click();
        utility.clearAllFields('.modal input', driver);
    }
});