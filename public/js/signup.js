const signUpFormHandler = async (event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());

    console.log(data);
    if (!validate(data)) {
        return false;
    }

    const { password, password2 } = data;

    if (password !== password2){
        return alert('Password didn\'t match!');
    }

    const response = await fetch('/api/signup', {
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

document
    .querySelector('.signup-button')
    .addEventListener('click', signUpFormHandler);
