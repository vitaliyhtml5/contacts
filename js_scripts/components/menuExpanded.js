const menuExpanded = () => {
    const menu = document.querySelector('.menu-expanded');
    const arrow = document.querySelector('.form-menu-expanded>i');
    
    menu.onclick = e => {
        e.stopPropagation();

        if (!menu.classList.contains('menu-expanded-active')
            && !document.querySelector('.item-chosen').classList.contains('no-categories-expanded')) {
            openMenu();
            createList();
        }  else {
            closeMenu();
        }
    }

    document.querySelectorAll('.menu-expanded li:not(.item-chosen)').forEach(el => {
        el.onclick = e => e.stopPropagation();
    });

    function createList() {
        if (document.querySelector('.menu-expanded li:not(.item-chosen)')) {
            document.querySelectorAll('.menu-expanded li').forEach(el => {
                el.onclick = () => {
                    const category = el.textContent;
                    document.querySelector('.item-chosen').textContent = el.textContent;
                    if (document.querySelector('.err-text-expanded')) {
                        document.querySelector('.err-text-expanded').remove();
                    }
                }
            });
        }
    }

    function openMenu() {
        menu.classList.add('menu-expanded-active');
        menu.scrollTo(0, 0);
        document.querySelector('.modal').onclick = () => closeMenu();
        document.body.onclick = () => closeMenu();
        arrow.style = 'transform: rotate(180deg)';
    }

    function closeMenu() {
        menu.scrollTo(0, 0);
        menu.classList.remove('menu-expanded-active');
        arrow.style = 'transform: rotate(0deg)';
    }
}

export {menuExpanded};