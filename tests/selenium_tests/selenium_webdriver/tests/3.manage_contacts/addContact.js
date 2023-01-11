const {By, Key, Builder} = require('selenium-webdriver');
const {expect} = require('chai');
const request = require('request');
const validation = require('../../support/validation');
const utility = require('../../support/utility');
const userData = require('../../fixtures/userData');
const contactsData = require('../../fixtures/contactsData');
const validateData = require('../../fixtures/validateData');

describe('User adds a new contact', () => {
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
        await driver.findElement(By.css('.btn-add-item')).click();
    });

    it('[Negative] User tries to add contact with not chosen category', async () =>  {
        await driver.findElement(By.css('.modal-btn-wrap .btn-primary')).click();  
        const errText = await driver.findElement(By.css('.err-text-expanded')).getText();
        expect(errText).to.equal('Choose category');
    });

    it('[Negative] User tries to add contact with empty fields', async () =>  {
        await chooseCategory();
        await validation.validateEmptyField('#check-name', '.modal-btn-wrap .btn-primary', driver);
        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[0].name);
        await validation.validateEmptyField('#check-email', '.modal-btn-wrap .btn-primary', driver);
    });

    it('[Negative] User tries to add contact when length of values is more than maxlength', async () => {
        await chooseCategory();
        await driver.findElement(By.css('#email')).sendKeys(contactsTestData[0].email);
        await validation.validateMaxlength('#name', '#check-name', testData.lengthText31, 30, '.modal-btn-wrap .btn-primary', driver);
        await utility.clearAllFields('.modal input', driver);

        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[0].name);
        await validation.validateMaxlength('#email', '#check-email', testData.lengthEmail31, 30, '.modal-btn-wrap .btn-primary', driver);
    });

    it('[Negative] User tries to add contact with invalid email', async () => {
        await chooseCategory();
        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[0].name);
        await validation.validateEmail('#email', '#check-email', '.modal-btn-wrap .btn-primary', driver);
    });

    //Positive
    it('User successfully adds contact', async () => {
        await chooseCategory();
        await driver.findElement(By.css('#name')).sendKeys(contactsTestData[0].name);
        await driver.findElement(By.css('#email')).sendKeys(contactsTestData[0].email);
        await driver.findElement(By.css('.modal-btn-wrap .btn-primary')).click();
        await validation.getAlert('Contact has been added', 'success', driver);
        
        //Postcondition
        await utility.removeUser(contactsTestData[0].name, driver);
    });

    after(() => driver && driver.quit());

    async function chooseCategory() {
        await driver.findElement(By.css('.menu-expanded')).click();
        await driver.findElement(By.css('.menu-expanded li[aria-label="Home category"]')).click();
    }
});