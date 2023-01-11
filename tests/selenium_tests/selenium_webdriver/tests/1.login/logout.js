const {By, Key, Builder} = require('selenium-webdriver');
const {expect} = require('chai');
const request = require('request');
const userData = require('../../fixtures/userData');

describe('User logs out of his account', () => {
    const userTestData = userData();
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

    it('Guest successfully logs out', async () =>  {   
        await driver.get('http://localhost/app/contacts/');
        await driver.findElement(By.css('.logout-btn')).click();
        await driver.findElement(By.css('.login-form')).then(el => {
            expect(el).to.exist;
        });
    });

    after(() => driver && driver.quit());
});
