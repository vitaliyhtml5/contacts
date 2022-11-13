import {addContact} from './addContact.js';

const userModal = type => {
    const categories = ['Home', 'Friends', 'Work', 'Other'];

    if (type === 'remove contact')  removeModal();
    else setContacts();

    function setContacts() {
        document.querySelector('.modal').innerHTML = `
        <h2>Add contact</h2>
        <button class="material-icons-outlined close-modal">close</button>
        <form class="form-menu-expanded">
            <i class="material-icons-outlined">expand_more</i>
            <ul class="menu-expanded">
                <li class="item-chosen">Choose category</li>
            </ul>
            <label>Name:<input></label>
            <label>Email:<input></label>
            <div class="modal-btn-wrap">
                <button class="btn-secondary btn-close">Cancel</button>
                <button class="btn-primary">Confirm</button>
            </div>
        </form>`;

            
        for (let i = 0; i < categories.length; i++) {
            document.querySelector('.menu-expanded').innerHTML += `
            <li><img src="img/${categories[i].toLowerCase()}.svg">${categories[i]}</li>`;
        }
        
        if (type === 'add contact') addContact();
    }


    function removeModal() {
        document.querySelector('.modal').innerHTML = `
        <h2>Remove contact</h2>
        <button class="material-icons-outlined close-modal">close</button>
        <div class="remove-modal">
            <p>Are you sure you want to delete<span></span>?</p>
            <div class="modal-btn-wrap">
                <button class="btn-secondary btn-close">Cancel</button>
                <button class="btn-primary">Confirm</button>
            </div>
        </div>`;
    }
}

export {userModal}