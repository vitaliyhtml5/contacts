const search = (updateData) => {
    const btn = document.querySelector('.search button');
    const input = document.querySelector('.search input');

    input.oninput = () => {
        if (input.value.length > 0) clearInput();
        else btn.style.display = 'none';
        updateData(1);
    }

    return input.value.trim().toLowerCase();

    function clearInput() {
        btn.style.display = 'block';
        btn.onclick = e => {
            e.preventDefault();
            input.value = '';
            btn.style.display = 'none';
            updateData(1);
        }
    } 
}

export {search};