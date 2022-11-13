const loaderBtn = btn => {
    btn.disabled = true;
    btn.classList.add('btn-primary-loader');
    const loader = document.createElement('span');
    btn.appendChild(loader);
    loader.classList.add('loader-btn');
}

const removeLoaderBtn = btn => {
    btn.disabled = false;
    btn.classList.remove('btn-primary-loader');
    btn.firstElementChild.remove();
}

const loaderBlockAdd = block => block.classList.add('loader-block');

const loaderBlockRemove = block => block.classList.remove('loader-block');

export {loaderBtn, removeLoaderBtn, loaderBlockAdd, loaderBlockRemove};