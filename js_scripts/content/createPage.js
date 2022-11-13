import {loginPage} from './loginPage.js';
import {userMain} from './userMain.js';
import {loaderBlockAdd} from '../components/loader.js';

const createPage = type => {
    const main = document.querySelector('.content');
    loaderBlockAdd(main);

    if (type === 'Login') loginPage(main);
    else if (type === 'Dashboard') userMain(main);
}

export {createPage};