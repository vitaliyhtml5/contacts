const {By, Key, Builder} = require('selenium-webdriver');

const getRandom = arr => arr[Math.floor(Math.random()*arr.length)];

const clearField = async (field, driver) => await driver.findElement(By.css(field)).clear();

const clearAllFields = async (field, driver) => await driver.findElements(By.css(field)).then(el => {
    el.forEach(input => input.clear());
});

const addUser = async (name, email, driver) => {
    await driver.findElement(By.css('.btn-add-item')).click();
    await driver.findElement(By.css('.menu-expanded')).click();
    await driver.findElement(By.css('.menu-expanded li[aria-label="Home category"]')).click();
    await driver.findElement(By.css('#name')).sendKeys(name);
    await driver.findElement(By.css('#email')).sendKeys(email);
    await driver.findElement(By.css('.modal-btn-wrap .btn-primary')).click();
}

const removeUser = async (name, driver) => {
    await driver.findElement(By.css(`button[aria-label="Remove ${name}"]`)).click();
    await driver.findElement(By.css('.modal-btn-wrap .btn-primary')).click();
}

module.exports = {getRandom, clearField, clearAllFields, addUser, removeUser};