const setPagination = (total, pageSize, loadData) => {
    const pagination = document.querySelector('.pagination');
    total > +pageSize ? createPagination(pagination, total, pageSize, loadData) : pagination.style.display = 'none';
}

const createPagination = (pagination, total, pageSize, loadData) => {
    const pageWrap = document.querySelector('.page-wrap');
    const pageBtn = document.querySelectorAll('.pagination>span');

    pagination.style.display = 'flex';
    
    if (!document.querySelector('.active-page') || !document.querySelector('.page-change')) {
        // Default state for the first loading and when filter/sort/search is applied
        countPages([1,2,3,4,5], 0);
    } else {
        const chosenPage = document.querySelector('.active-page');
        
        const pageArr = buildPages(document.querySelectorAll('.page-wrap button')[0].textContent);
        const pageIndex = Array.from(chosenPage.parentElement.children).indexOf(chosenPage);

        document.querySelector('.page-change').classList.remove('page-change');

        countPages(pageArr, pageIndex);
    }

     //Create an array with page order
    function buildPages(firstEl) {
        const arr = [+firstEl];
        for (let i = 1; i < 5; i++) {
            arr.push(+arr[i-1] + 1);
        }
        return arr;
    }
    
    //Create pagination list
    function countPages(pageArr, pageIndex, activeTotal) {
        pageWrap.innerHTML = ``;
        pageBtn.forEach(el => el.style.display = 'none');

        for (let i = 1; i <= Math.ceil(total/pageSize); i++) {
            if (i === 4 && total > 5*pageSize && pageArr[3] <= Math.ceil(total/pageSize)-2) {
                pageWrap.innerHTML += `
                <button aria-label="page ${pageArr[i-1]}">${pageArr[i-1]}</button><span>...</span><button class="total" aria-label="${Math.ceil(total/pageSize)}">${Math.ceil(total/pageSize)}</button>`;
                pageBtn.forEach(el => el.style.display = 'block');                
                break;
            } else if (pageArr[i-1] !== undefined) {
                pageWrap.innerHTML += `<button aria-label="page ${pageArr[i-1]}">${pageArr[i-1]}</button>`;
            }
        }
        
        if (activeTotal) document.querySelector('.page-wrap button:last-child').classList.add('active-page');
        else document.querySelectorAll('.page-wrap button')[pageIndex].classList.add('active-page');

        setPageArrow(pageArr, Math.ceil(total/pageSize));

        changePages();    
    }

    function setPageArrow(pageArr, total) {
        if (pageArr[3] <= 4) pageBtn[0].style.display = 'none';
        else if (pageArr[pageArr.length-1] === total) {
            pageBtn[0].style.display = 'block';
            pageBtn[1].style.display = 'none';
        }
    }

    //Change pages by clicking on numbers
    function changePages() {
        document.querySelectorAll('.page-wrap button:not(.active-page)').forEach(el => {
            el.onclick = () => {
                document.querySelector('.active-page').classList.remove('active-page');
                document.querySelector('.page-wrap').classList.add('page-change');
                el.classList.add('active-page');

                if (!el.classList.contains('total')) loadData(+el.textContent);
                else {
                    countPages(buildPages(+el.textContent - 4), 0, 'total');
                    loadData(+el.textContent);
                }
            }
        });
    }

    //Change group of pages by clicking on arrows
    pageBtn[1].onclick = () => {
        const lastPage = +document.querySelectorAll('.page-wrap b:not(.total)')[3].textContent;
        const total = +document.querySelector('.total').textContent;
        setPageState();
    
        if (lastPage >= total - 5) {
            const newPageArr = buildPages(total - 4);
            countPages(newPageArr, 0);
            loadData(newPageArr[0]);
        } else {
            countPages(buildPages(lastPage+1), 0);
            loadData(lastPage + 1);
        }
    }

    pageBtn[0].onclick = () => {
        const firstPage = +document.querySelectorAll('.page-wrap button')[0].textContent;
        const pageArr = document.querySelectorAll('.page-wrap button');
        const total = +pageArr[pageArr.length - 1].textContent;
        let pageGap;

        //Get gap between total and last number before ... so that it'spossible back to this order
        if (total >= 10) pageGap = firstPage - (total - 8 - 1);
        else pageGap = 1;

        setPageState();
        
        if (!document.querySelector('.total')) {
            const newPageArr = buildPages(pageGap);
            countPages(newPageArr, 0);
            (pageGap === 1) ? loadData(1) : loadData(newPageArr[0]);
        } else {
            countPages(buildPages(firstPage - 4), 0);
            loadData(firstPage - 4)
        }   
    }

    function setPageState() {
        document.querySelector('.active-page').classList.remove('active-page');
        document.querySelector('.page-wrap').classList.add('page-change');
        document.querySelectorAll('.page-wrap button')[0].classList.add('active-page');
    }
}

export {setPagination};