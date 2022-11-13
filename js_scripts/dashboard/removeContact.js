import {getData} from './getData.js';
import {userModal} from './userModal.js';
import {modal} from '../components/modal.js';
import {showAlert} from '../components/alert.js';
import {loaderBtn, removeLoaderBtn} from '../components/loader.js';
import {closeOverlay} from '../components/modal.js';

const removeContact = data => {
    modal(userModal, 'remove contact');
    document.querySelector('.remove-modal span').textContent = `${data.name} `;

    document.querySelector('.modal-btn-wrap .btn-primary').onclick = e => {
        e.preventDefault();
        deleteContact(e.target);
    }

    async function deleteContact(btn) {
        loaderBtn(btn);

        const res = await fetch(`./api/remove_contact.php?id=${data.id}`, {method: 'DELETE'});
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

export {removeContact};