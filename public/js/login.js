const loginFormHandler = async (event) => {
    event.preventDefault();

    const form = document.querySelector('form#login-form');
    const data = Object.fromEntries(new FormData(form).entries());

    if (!validate(data)) {
        return false;
    }

    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(
            'Failed to login. ' +
                response.status +
                ': ' +
                response.statusText
        );
    }
};

//add event listeners
document
    .querySelector('.login-button')
    .addEventListener('click', loginFormHandler);
