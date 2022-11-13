import {logout} from '../logout.js';
import {getData} from '../dashboard/getData.js';
import {userModal} from '../dashboard/userModal.js';
import {loaderBlockRemove} from '../components/loader.js';
import {modal} from '../components/modal.js';

const userMain = main => {
    main.innerHTML = `
    <div class="tools-wrap">
        <button class="btn-primary btn-add-item"><span class="material-icons-outlined">add</span>Add word</button>
        <form class="search">
            <div>
                <span class="material-icons-outlined">search</span>
                <input>
                <button class="material-icons-outlined">close</button>
            </div>
        </form>
        <div class="filter">
            <button class="btn-primary">Filter<span class="material-icons-outlined">tungsten</span></button>
        </div>
        <div class="dropdown"></div>
    </div>
    <div class="main-table">
        <table>
            <thead>
                <tr>
                    <th>
                        <button>Name<span class="material-icons-outlined">south</span></button> 
                    </th>
                    <th>
                        <button>Email<span class="material-icons-outlined">south</span></button> 
                    </th>
                    <th>Actions</th>
                </tr>        
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div class="pagination">
        <span class="material-icons-outlined">arrow_back_ios</span>
        <div class="page-wrap"></div>
        <span class="material-icons-outlined">arrow_forward_ios</span>
    </div>`;
    loaderBlockRemove(main);
    getData(1);

    document.querySelector('.header-wrap .logout-btn').style.display = 'block';
    document.querySelector('.logout-btn').onclick = logout;

    document.querySelector('.btn-add-item').onclick = e => {
        e.stopPropagation();
        modal(userModal, 'add contact');
    }
}

export {userMain};