import {createPage} from './content/createPage.js';
import {showAlert} from './components/alert.js';
import {loaderBtn, removeLoaderBtn} from './components/loader.js';
import {checkEmpty, checkEmailFormat} from './utility/validation.js';

const login = e => {
    e.preventDefault();
    document.querySelector('.header-wrap button').style.display = 'none';
    const input = document.querySelectorAll('.login-form input');

    if (!checkEmpty(input[0])
        || !checkEmpty(input[1])
        || !checkEmailFormat(input[0])) {
        return;
    } else {
        const data = {
            email: input[0].value,
            password: input[1].value
        }
        loginUser(data, document.querySelector('.login-form button'));
    }

    async function loginUser(data, btn) {
        loaderBtn(btn);
        const res = await fetch('./api/login.php', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        });
        removeLoaderBtn(btn);

        if (res.status === 201) {
            createPage('Dashboard');
        } else {
            const result = await res.json();
            showAlert(result.error, 'err');
        }
    } 
}

export {login};