import {getData} from './getData.js';
import {userModal} from './userModal.js';
import {modal} from '../components/modal.js';
import {menuExpanded} from '../components/menuExpanded.js';
import {showAlert} from '../components/alert.js';
import {loaderBtn, removeLoaderBtn} from '../components/loader.js';
import {closeOverlay} from '../components/modal.js';
import {checkEmpty, checkLength, checkEmailFormat} from '../utility/validation.js';

const editContact = data => {
    modal(userModal, 'add contact');
    const input = document.querySelectorAll('label input');
    input[0].value = data.name;
    input[1].value = data.email;
    document.querySelector('.modal h2').textContent = 'Edit contact';
    document.querySelector('.item-chosen').textContent = data.category;
    menuExpanded();

    document.querySelector('.modal-btn-wrap .btn-primary').onclick = e => {
        e.preventDefault();
        
        if (!checkEmpty(input[0]) 
            || !checkEmpty(input[1])
            || !checkLength(input[0], 30) 
            || !checkLength(input[1], 30)
            || !checkEmailFormat(input[1])) return false;
        else {
            updateContact(e.target);
        }
    }

    async function updateContact(btn) {
        const dataReq = {
            'id': data.id,
            'name': input[0].value.trim(),
            'email': input[1].value.trim(), 
            'category': document.querySelector('.item-chosen').textContent.toLowerCase().trim()
        }
        loaderBtn(btn);

        const res = await fetch('./api/edit_contact.php', {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(dataReq)
        });
        const result = await res.json();
        
        if (res.status === 200) {
            closeOverlay();
            getData(1);
            showAlert(result.message);
        } else {
            removeLoaderBtn(btn);
            showAlert(result.error, 'err');
        }
    }
}

export {editContact};