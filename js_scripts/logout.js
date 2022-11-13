import {loginPage} from './content/loginPage.js';
import {loaderBlockAdd} from './components/loader.js';
import {showAlert} from './components/alert.js';

const logout = () => {
    logoutUser();

    async function logoutUser() {
        const res = await fetch('./api/logout.php', {method: 'DELETE'});

        if (res.status === 204) {
            const main = document.querySelector('.content');
            document.querySelector('.header-wrap button').style.display = 'none';
            loaderBlockAdd(main);
            loginPage(main);
        } else {
            showAlert('Something went wrong', 'err');
        }
    } 
}

export {logout};