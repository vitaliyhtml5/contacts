const showAlert = (text, type = 'success') => {
    const alert = document.createElement('div');
    document.body.appendChild(alert);
    alert.classList.add('alert');
    
    alert.innerHTML = `
    <span class="material-icons-outlined">tungsten</span>
    <p>${text}</p>
    <button class="material-icons-outlined">close</button>`;

    if (type === 'err') alert.classList.add('alert-err');
    else alert.classList.remove('alert-err');

    closeAlert(alert);

    document.querySelector('.alert button').onclick = () => {
        alert.style.display = 'none';
        closeAlert(alert);
    }

    function closeAlert(alert) {
        setTimeout(() => alert.remove(), 2500);
    }
}

export {showAlert};