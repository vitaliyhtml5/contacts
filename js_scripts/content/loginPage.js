import {login} from '../login.js';
import {loaderBlockRemove} from '../components/loader.js';
import {unmaskPwd} from '../utility/utility.js';

const loginPage = main => {
    main.innerHTML = `
    <form class="login-form">
        <h2>Log in</h2>
        <label for="email">Email:<input id="email" aria-required="true"></label>
        <label for="password">Password:<input type="password" id="password" class="input-pwd" aria-required="true"><i class="material-icons-outlined" role="button" aria-label="show password" tabindex="0">visibility</i></label>
        <button class="btn-primary">Log in</button>
    </form>`;

    loaderBlockRemove(main);
    document.querySelector('.header-wrap .logout-btn').style.display = 'none';
    unmaskPwd(document.querySelector('.input-pwd'));
    document.querySelector('.login-form').onsubmit = e => login(e);
}

export {loginPage};