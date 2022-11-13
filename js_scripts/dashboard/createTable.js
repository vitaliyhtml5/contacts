import {getData} from './getData.js';
import {editContact} from './editContact.js';
import {removeContact} from './removeContact.js';
import {setPagination} from '../components/pagination.js';

const createTable = (container, data) => {
    container.scrollTo(0, 0);
    container.innerHTML = ``;

    if (data.data === 'No results found') {
        document.querySelector('.main-table').classList.add('no-results-block');
        document.querySelector('.pagination').style.display = 'none';
        return;
    }
    else {
        document.querySelector('.main-table').classList.remove('no-results-block');
        createData();
        setPagination(data.meta.total, 10, getData);
    }

    function createData() {
        for (let i = 0; i < data.data.length; i++) {
            container.innerHTML += `
            <tr>
                <td><img src="img/${data.data[i].category}.svg" alt="${data.data[i].category} category" title = "${data.data[i].category}">${data.data[i].name}</td>
                <td>${data.data[i].email}</td>
                <td>
                    <div class="table-btn-wrap">
                        <button class="edit-table"><span class="material-icons-outlined">edit</span>Edit</button>
                        <button class="remove-table"><span class="material-icons-outlined">delete</span>Remove</button>
                    </div>
                </td>
            </tr>`;
        }

        document.querySelectorAll('.table-btn-wrap .edit-table').forEach((el, index) => {
            el.onclick = () => editContact(data.data[index]);
        });
        document.querySelectorAll('.table-btn-wrap .remove-table').forEach((el, index) => {
            el.onclick = () => removeContact(data.data[index]);
        });
    }
}

export {createTable};