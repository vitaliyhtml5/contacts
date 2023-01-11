const {By, Key, Builder} = require('selenium-webdriver');
const {expect} = require('chai');
const request = require('request');
const userData = require('../../fixtures/userData');

describe('User filters contacts according to categories', () => {
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

    it('User filters contacts by "Home" category', async () =>  {
        await setFilter('label[for="Home"]', 'home');
    });

    it('User filters contacts by "Friends" category', async () =>  {
        await setFilter('label[for="Friends"]', 'friends');
    });

    it('User filters contacts by "Work" category', async () =>  {
        await setFilter('label[for="Work"]', 'work');
    });

    it('User filters contacts by "Other" category', async () =>  {
        await setFilter('label[for="Other"]', 'other');
    });

    it('User filters contacts by a few categories', async () =>  {
        const filter = ['label[for="Home"]', 'label[for="Friends"]', 'label[for="Work"]', 'label[for="Other"]'];
        const val = ['home', 'friends', 'work', 'other'];
        const index = getRandom([0, 1, 2, 3]);

        await driver.findElement(By.css('.filter button')).click();
        await driver.findElement(By.css(filter[index[0]])).click();
        await driver.findElement(By.css(filter[index[1]])).click();
        await driver.findElements(By.css('.filter-btn button')).then(el => el[0].click());
        const arr =  await driver.findElements(By.css('.main-table td>img'));
        for (let i of arr) {
            expect(await i.getAttribute('title')).to.be.oneOf([val[index[0]], val[index[1]]]);
        }
    });

    after(() => driver && driver.quit());

    async function setFilter(filter, val) {
        await driver.findElement(By.css('.filter button')).click();
        await driver.findElement(By.css(filter)).click();
        await driver.findElements(By.css('.filter-btn button')).then(el => el[0].click());
        const arr =  await driver.findElements(By.css('.main-table td>img'));
        for (let i of arr) {
            expect(await i.getAttribute('title')).to.eql(val);
        }
    }

    function getRandom(arr) {
        const data = [];
        data.push(Math.floor(Math.random()*arr.length));
    
        for(let i = 0; i < 1; i++) {
          let val = Math.floor(Math.random()*arr.length);
          (val === data[0]) ? i = 0 : data.push(val);
        }
        return data;
    }
});