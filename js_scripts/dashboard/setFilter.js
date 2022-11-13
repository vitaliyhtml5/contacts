import {getData} from './getData.js';

const setFilter = (dropdown, applyFilter) => {
    const categories = ['Home', 'Friends', 'Work', 'Other'];
    dropdown.innerHTML = `
    <h3>Category</h3>
    <div class="dropdown-list"></div>
    <div class="filter-btn">
        <button class="btn-primary">Apply</button>
        <button class="btn-primary">Cancel</button>
    </div>`;

    applyFilter(getData);
    fillCategorories();
    
    function fillCategorories() {
        for (let i = 0; i < categories.length; i++) {
            document.querySelector('.dropdown-list').innerHTML += `
            <label>
                <input type="checkbox">
                <span>${categories[i]}</span>
            </label>`;
        }
    }
}

export {setFilter};