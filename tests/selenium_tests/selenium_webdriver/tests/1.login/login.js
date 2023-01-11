const {By, Key, Builder} = require('selenium-webdriver');
const {expect} = require('chai');
const validation = require('../../support/validation');
const utility = require('../../support/utility');
const userData = require('../../fixtures/userData');
const validateData = require('../../fixtures/validateData');

describe('Guest logs in his account', () => {
    const userTestData = userData();
    const testData = validateData();
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({implicit: 500});
    });

    beforeEach(async () => {
        await driver.get('http://localhost/app/contacts/');
    });

    it('[Negative] Guest tries to log in with empty fields', async () =>  {
        await validation.validateEmptyField('#check-email', '.login-form button', driver);
        await driver.findElement(By.css('#email')).sendKeys(userTestData.email);           
        await validation.validateEmptyField('#check-password', '.login-form button', driver);        
    });

    it('[Negative] Guest tries to log in when length of values is more than maxlength', async () => {
        await driver.findElement(By.css('#password')).sendKeys(userTestData.password);
        await validation.validateMaxlength('#email', '#check-email', testData.lengthEmail31, 30, '.login-form button', driver);
        await utility.clearAllFields('input', driver);

        await driver.findElement(By.css('#email')).sendKeys(userTestData.email);
        await validation.validateMaxlength('#password', '#check-password', testData.lengthText31, 30, '.login-form button', driver);
    });

    it('[Negative] Guest tries to log in with invalid email', async () => {
        await driver.findElement(By.css('#password')).sendKeys(userTestData.password);
        await validation.validateEmail('#email', '#check-email', '.login-form button', driver);
    });

    it('[Negative] Guest tries to log in with not registered email', async () => {
        await fillAllFields(testData.notRegisteredEmail, userTestData.password);
        await validation.getAlert('Incorrect credentials', 'err', driver);
    });

    it('[Negative] Guest tries to log in with registered email and incorrect password', async () => {
        await fillAllFields(userTestData.email, testData.incorrectPwd);
        await validation.getAlert('Incorrect credentials', 'err', driver);
    });

    //Positive
    it('Guest unmasks password during log in', async () => {
        await driver.findElement(By.css('#password+i')).click();
        await driver.findElement(By.css('#password')).getAttribute('type').then(attr => {
            expect(attr).to.eql('text');
        });
        await driver.findElement(By.css('#password+i')).click();
        await driver.findElement(By.css('#password')).getAttribute('type').then(attr => {
            expect(attr).to.eql('password');
        });
    });

    it('Guest successfully logs in', async () => {
        await fillAllFields(userTestData.email, userTestData.password);       
        await driver.findElement(By.css('.main-table')).then(el => {
            expect(el).to.exist;
        });
    });

    after(() => driver && driver.quit());

    async function fillAllFields(email, pwd) {
        await driver.findElement(By.css('#email')).sendKeys(email);
        await driver.findElement(By.css('#password')).sendKeys(pwd);
        await driver.findElement(By.css('.login-form button')).click();
    }
});
