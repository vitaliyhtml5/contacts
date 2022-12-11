import {setFilter} from '../dashboard/setFilter.js';

const filter = updateData => {
    const filterBtn = document.querySelector('.filter');
    const dropdown = document.querySelector('.dropdown');
    let filterData;
    let filterArr = [];
    
    filterData = getfilters();

    dropdown.onclick = e => e.stopPropagation();

    filterBtn.onclick = e => {
        e.stopPropagation();
        if (dropdown.style.display === 'flex') closeDropdown();
        else dropdown.style.display = 'flex';
        
        if (dropdown.innerHTML === ``) {
            setFilter(dropdown, applyFilter);
        }
        else applyFilter(updateData);
    }

    function applyFilter(updateData) {
        const btn = document.querySelectorAll('.dropdown .btn-primary');
        btn[1].onclick = closeDropdown;
        btn[0].onclick = () => {
            updateData(1);
            dropdown.style.display = 'none';
            showFilterActive();
        }
    }

    //Utilities for Filter
    function getfilters() {
        const val = document.querySelectorAll('.dropdown-list label span');
        const input = document.querySelectorAll('.dropdown-list input');
        getchecked();
        filterData = '';
        
        for (let i = 0; i < input.length; i++) {
            if (input[i].checked) filterData += `,${val[i].textContent}`;
        }
        return filterData.slice(1);
    }

    function showFilterActive() {
        const icon = document.querySelector('.filter .btn-primary span');
        const input = document.querySelectorAll('.dropdown-list input');
        for (let i = 0; i < input.length; i++) {
            if (input[i].checked) {
                icon.style.visibility = 'visible';
                break;
            } else icon.style.visibility = 'hidden';
        }
    }

    //Get checked filters in case of canceling the dropdown
    function getchecked() {
        filterArr = [];
        document.querySelectorAll('.dropdown-list input').forEach((el, index) => {
            if (el.checked) filterArr.push(index);
        });
    }

    //Close dropdown
    function closeDropdown() {
        dropdown.style.display = 'none';
      
        if (document.querySelectorAll('.dropdown-list input')) {
            document.querySelectorAll('.dropdown-list input').forEach((el, index) => {
                if (filterArr.includes(index)) el.checked = true;
                else el.checked = false;
            });
        }
    }

    document.onclick = () => {
        if (dropdown.style.display === 'flex') closeDropdown();
    }

    document.body.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDropdown();
    });

    return filterData.toLocaleLowerCase();
}

export {filter};