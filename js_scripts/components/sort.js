import {getData} from '../dashboard/getData.js';
import {accessSetSorting} from '../utility/accessibility.js';

const sort = () => {
    const btn = document.querySelectorAll('thead button');
    let order = getSorting();

    btn.forEach(el => {
        el.onclick = () => {
            if (!el.classList.contains('sort-asc') && !el.classList.contains('sort-desc')) {
                clearSorting();
                el.classList.add('sort-asc');
                accessSetSorting(el, 'asc');
            } else if (el.classList.contains('sort-asc')) {
                clearSorting();
                el.classList.add('sort-desc');
                accessSetSorting(el, 'desc');
            } else {
                clearSorting();
                accessSetSorting(el, null);
            }

            getData(1);
        }
    });

    return order;

    function getSorting() {
        let order = 'name';
        for (let i = 0; i < btn.length; i++) {
            if (btn[i].classList.contains('sort-asc')) {
                order = btn[i].textContent.slice(0, -5).toLowerCase();
                break;
            } else if (btn[i].classList.contains('sort-desc')) {
                order = `-${btn[i].textContent.slice(0, -5).toLowerCase()}`;
                break;
            }
        }
        return order;
    }

    function clearSorting() {
        btn.forEach(el => {
            el.classList.remove('sort-asc');
            el.classList.remove('sort-desc');
        });
    }
}

export {sort};