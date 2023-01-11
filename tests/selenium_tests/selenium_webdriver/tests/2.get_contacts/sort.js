const {By, Key, Builder} = require('selenium-webdriver');
const {expect} = require('chai');
const request = require('request');
const userData = require('../../fixtures/userData');

describe('User sorts contacts', () => {
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

    it('User sorts contacts by name', async () =>  {
        await driver.findElement(By.css('.main-table th:first-child button')).click();
        const arr =  await driver.findElements(By.css('.main-table td:first-child'));
        sortDataAsc(arr);

        await driver.findElement(By.css('.main-table th:first-child button')).click();
        const arrDesc =  await driver.findElements(By.css('.main-table td:first-child'));
        sortDataDesc(arrDesc);
    });

    it('User sorts contacts by email', async () =>  {
        await driver.findElement(By.css('.main-table th:nth-child(2) button')).click();
        const arr =  await driver.findElements(By.css('.main-table td:nth-child(2)'));
        sortDataAsc(arr);

        await driver.findElement(By.css('.main-table th:nth-child(2) button')).click();
        const arrDesc =  await driver.findElements(By.css('.main-table td:nth-child(2)'));
        sortDataDesc(arrDesc);
    });

    async function sortDataAsc(arr) {
        let arrData = [];
        for (let i of arr) {
            let sorted = true;
            arrData.push(await i.getText());
            if (arrData[i] > 0
                && arrData[i] > arrData[i + 1]) {
              sorted = false;
            }
            expect(sorted).to.equal(true);
        }
    }

    async function sortDataDesc(arr) {
        let arrData = [];
        for (let i of arr) {
            let sorted = true;
            arrData.push(await i.getText());
            if (arrData[i] > 0
                && arrData[i] < arrData[i + 1]) {
              sorted = false;
            }
            expect(sorted).to.equal(true);
        }
    }

    after(() => driver && driver.quit());
});