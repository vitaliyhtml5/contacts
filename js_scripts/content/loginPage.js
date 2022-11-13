import {login} from '../login.js';
import {loaderBlockRemove} from '../components/loader.js';
import {unmaskPwd} from '../utility/utility.js';

const loginPage = main => {
    main.innerHTML = `
    <form class="login-form">
        <h2>Log in</h2>
        <label>Email:<input></label>
        <label>Password:<input type="password" class="input-pwd"><i class="material-icons-outlined">visibility</i></label>
        <button class="btn-primary">Log in</button>
    </form>`;

    loaderBlockRemove(main);
    document.querySelector('.header-wrap .logout-btn').style.display = 'none';
    unmaskPwd(document.querySelector('.input-pwd'));
    document.querySelector('.login-form').onsubmit = e => login(e);
}

export {loginPage};