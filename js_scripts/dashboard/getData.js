import {createTable} from './createTable.js';
import {loaderBlockAdd,loaderBlockRemove} from '../components/loader.js';
import {search} from '../components/search.js';
import {filter} from '../components/filter.js';
import {sort} from '../components/sort.js';

const getData = (pageNumber) => {
    const container = document.querySelector('.main-table tbody');
    const pageSize = 10;
    getContacts(setContacts(pageNumber, pageSize));

    async function getContacts(param) {
        loaderBlockAdd(container);

        const res = await fetch(`./api/get_contacts.php?page=${pageNumber}&page_size=${pageSize}&category=${param.category}&search=${param.search}&sort=${param.sort}`);
        const data = await res.json();
        createTable(container, data);

        loaderBlockRemove(container);
    }
    
    function setContacts() {
        const param = {
            category: filter(getData),
            search: search(getData),
            sort: sort()
        }
        return param;
    }
}

export {getData};