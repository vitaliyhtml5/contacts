import {addErr} from './utility.js';

const checkEmpty = field => {
    if (field.value === '') {
        addErr(field, 'Can\'t be blank');
        return false;
    } else return true;
}

const checkLength = (field, length) => {
    if (field.value.length > length) {
        addErr(field, `Max length is ${length} chars`);
        return false;
    } else return true;
}

const checkEmailFormat = (field) => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!field.value.match(emailReg)) {
        addErr(field, 'Invalid email format');
        return false;
    } else return true; 
}

const checkExpanded = text => {
    const category = document.querySelector('.item-chosen');

    if ((category.textContent === text) 
        && !document.querySelector('.err-text-expanded')) {
        const menu = document.querySelector('.menu-expanded');
        const errField = document.createElement('span');

        menu.parentNode.insertBefore(errField, menu.nextSibling);
        errField.classList.add('err-text-expanded');
        errField.textContent = text;
        return false;
    } 
    else if (document.querySelector('.err-text-expanded')) return false;
    else return true;
}


export {checkEmpty, checkLength, checkExpanded, checkEmailFormat};