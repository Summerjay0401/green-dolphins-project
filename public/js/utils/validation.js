const addError = (prop) => {
    const node = document.createElement('span');
    node.classList.add('span-error');
    const textnode = document.createTextNode(`${prop} is required`);
    node.appendChild(textnode);
    const field = document.getElementById(prop);
    field.classList.add('field-error');
    field.parentElement.appendChild(node);
};

const clearError = (prop) => {
    const field = document.getElementById(prop);
    field.classList.remove('field-error');
    const spanError = field.nextElementSibling.nextElementSibling;

    if(spanError) {
        field.parentElement.removeChild(spanError);
    }
};

// eslint-disable-next-line no-unused-vars
const validate = (entries) => {
    let valid = true;

    for (const prop in entries) {
        const value = entries[prop];

        clearError(prop);

        if (!value) {
            valid = false;

            addError(prop);
        }

    }

    return valid;
};
