const modal = (content, type) => {
    const overlay = document.createElement('div');
    document.body.appendChild(overlay);
    overlay.classList.add('overlay');

    document.querySelector('.overlay').style.animation = 'fadeIn ease-out 0.4s forwards';
	document.body.style.overflowY = 'hidden';

    overlay.innerHTML = `<div class="modal"></div>`;
    content(type);

    document.querySelector('.modal').onclick = e => e.stopPropagation();
    document.querySelector('.close-modal').onclick = () => closeOverlay();

    setTimeout(() => {
        if (type === 'remove contact') {
            document.body.onclick = () => closeOverlay(overlay);
        }
    }, 200);

    document.querySelector('.modal-btn-wrap .btn-close').onclick = e => {
        e.preventDefault();
        closeOverlay(overlay);
    }

    document.body.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeOverlay();
	});
}

function closeOverlay(overlay = document.querySelector('.overlay')) {
    if (overlay) {
        overlay.style.animation = 'fadeOut ease-out 0.4s forwards';
        document.body.style.overflowY = 'auto';
        setTimeout(() => overlay.remove(), 400);
    }
}

export {modal, closeOverlay};