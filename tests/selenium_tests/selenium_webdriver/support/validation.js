const {By, Key, Builder} = require('selenium-webdriver');
const {expect} = require('chai');
const utility = require('./utility');

const validateEmptyField = async (field, btn, driver) => {
    await driver.findElement(By.css(btn)).click();
    const errText = await driver.findElement(By.css(field)).getText();
    expect(errText).to.equal("Can't be blank");
}

const validateMaxlength = async (input, field, data, length, btn, driver) => {
    await driver.findElement(By.css(input)).sendKeys(data);  
    await driver.findElement(By.css(btn)).click();
    const errText = await driver.findElement(By.css(field)).getText();
    expect(errText).to.equal('Max length is 30 chars');
}

const validateEmail = async (input, field, btn, driver) => {
    const invalidEmail = await ['testtest.com', 'te st@test.com', 'test@test'];
    await driver.findElement(By.css(input)).sendKeys(utility.getRandom(invalidEmail));
    await driver.findElement(By.css(btn)).click();
    const errText = await driver.findElement(By.css(field)).getText();
    expect(errText).to.equal('Invalid email format');
}

const getAlert = async (text, type, driver) => {
    const alert = await driver.findElement(By.css('.alert')).getAttribute('class');
    const alertText = await driver.findElement(By.css('.alert p')).getText();
    expect(alertText).to.equal(text);
    if (type === 'err') {
        expect(alert).to.contain('alert-err');
    } else {
        expect(alert).to.not.contain('alert-err');
    }
}

module.exports = {validateEmptyField, validateMaxlength, validateEmail, getAlert};