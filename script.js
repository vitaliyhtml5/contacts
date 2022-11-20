import {createPage} from './js_scripts/content/createPage.js';

createSession();

async function createSession() {
    const res = await fetch('./api/session.php');
    if (res.status === 204) createPage('Dashboard');
    else if (res.status === 401) createPage('Login');
}