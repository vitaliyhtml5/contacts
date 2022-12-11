import {accessAddErrField, accessRemoveErrField} from './accessibility.js';

const addErr = (field, text) => {
    if (field.nextElementSibling 
        && field.nextElementSibling.innerText === text) {
        return
    }

    const errField = document.createElement('span');
    field.parentNode.insertBefore(errField, field.nextSibling);

    errField.textContent = text;
    field.classList.add('field-err');
    field.focus();

    accessAddErrField(field, errField);
    removeErr(field, errField);
}

const removeErr = (field, errField) => {
    field.oninput = () => {
        field.classList.remove('field-err');
        errField.remove();
        accessRemoveErrField(field, errField);
    }
}

const unmaskPwd = field => {
    field.nextElementSibling.addEventListener('click', e => {
        if (field.type === 'password') {
            field.type = 'text';
            e.target.textContent = 'visibility_off';
            e.target.ariaLabel = 'unmask password';
        } else {
            field.type = 'password';
            e.target.textContent = 'visibility';
            e.target.ariaLabel = 'mask password';
        }
    });
}

const showHide = (el, style) => el.style.display = style;

export {addErr, unmaskPwd, showHide};