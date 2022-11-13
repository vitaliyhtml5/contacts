import {getData} from './getData.js';
import {menuExpanded} from '../components/menuExpanded.js';
import {showAlert} from '../components/alert.js';
import {loaderBtn, removeLoaderBtn} from '../components/loader.js';
import {closeOverlay} from '../components/modal.js';
import {checkEmpty, checkExpanded, checkLength, checkEmailFormat} from '../utility/validation.js';

const addContact = () => {
    const input = document.querySelectorAll('label input');
    menuExpanded();

    document.querySelector('.modal-btn-wrap .btn-primary').onclick = e => {
        e.preventDefault();
        
        if (!checkExpanded('Choose category')) return false;
        else if (!checkEmpty(input[0]) 
                || !checkEmpty(input[1])
                || !checkLength(input[0], 30) 
                || !checkLength(input[1], 30)
                || !checkEmailFormat(input[1])) return false;
        else {
            addNewContact(e.target);
        }
    }

    async function addNewContact(btn) {
        const data = {
            'name': input[0].value.trim(),
            'email': input[1].value.trim(), 
            'category': document.querySelector('.item-chosen').textContent.toLowerCase().trim()
        }
        loaderBtn(btn);

        const res = await fetch('./api/add_contact.php', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        
        if (res.status === 201) {
            closeOverlay();
            getData(1);
            showAlert(result.message);
        } else {
            removeLoaderBtn(btn);
            showAlert(result.error, 'err');
        }
    }
}

export {addContact};