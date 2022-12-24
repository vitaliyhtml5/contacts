const accessAddErrField = (field, errField) => {
    const label = `check-${field.id}`;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-labelledby', label);
    errField.id = label;
}

const accessRemoveErrField = field => {
    field.removeAttribute('aria-labelledby');
    field.removeAttribute('aria-invalid');
}

const accessSetSorting = (btn, order) => {
    const val = btn.textContent.slice(0, -5);
    if (order === 'asc') {
        btn.setAttribute('aria-label', `ascending sorting by ${val}`);
    } else if (order === 'desc') {
        btn.setAttribute('aria-label', `descending sorting by ${val}`);
    } else {
        btn.setAttribute('aria-label', `sorting by ${val}`);
    }
}

export {accessAddErrField, accessRemoveErrField, accessSetSorting};