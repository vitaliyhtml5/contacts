const {By, Key, Builder, until} = require('selenium-webdriver');
const {expect} = require('chai');
const request = require('request');
const userData = require('../../fixtures/userData');

describe('User searches contacts via "Search" field', () => {
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

    beforeEach(async () => {
        await driver.get('http://localhost/app/contacts/');
    });

    it('User gets "No results found" message', async () =>  {
        await driver.findElement(By.css('#search')).sendKeys('not-found-contact');
        const table = await driver.findElement(By.css('.main-table')).getAttribute('class');
        expect(table).to.contain('no-results-block');
    });

    it('User clears search data', async () =>  {
        await driver.findElement(By.css('#search')).sendKeys('Lorem ipsum');
        await driver.findElement(By.css('#search+button')).click();
        const search = await driver.findElement(By.css('#search')).getAttribute('value');
        expect(search).to.eql('');
    });

    it('User successfully gets contact by name', async () => {
        const name = await driver.findElement(By.css('.main-table td:first-child')).getText();
        await driver.findElement(By.css('#search')).sendKeys(name);
        driver.wait(until.elementLocated(By.css(`button[aria-label="Edit ${name}"]`)), 1000);
        const arr =  await driver.findElements(By.css('.main-table tr td:first-child'));
        for (let i of arr) {
            expect(await i.getText()).to.eql(name);
        }
    });

    it('User successfully gets contact by email', async () => {
        const name = await driver.findElement(By.css('.main-table tr td:nth-child(2)')).getText();
        const email = await driver.findElement(By.css('.main-table tr td:nth-child(2)')).getText();
        await driver.findElement(By.css('#search')).sendKeys(email);
        driver.wait(until.elementLocated(By.css(`button[aria-label="Edit ${name}"]`)), 1000);
        const arr =  await driver.findElements(By.css('.main-table tr td:nth-child(2)'));
        for (let i of arr) {
            expect(await i.getText()).to.eql(email);
        }
    });

    after(() => driver && driver.quit());
});