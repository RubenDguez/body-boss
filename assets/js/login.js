const formEl = document.querySelector('form');

const usernameEl = document.getElementById('username');
const usernameErrorEl = document.getElementById('usernameError');
const passwordEl = document.getElementById('password');
const passwordErrorEl = document.getElementById('passwordError');
const generalErrorEl = document.getElementById('generalError');

const DISPLAY_NONE = 'display-none';
const REQUIRED_ERROR_MESSAGE = 'field is required.';
const USERNAME_PASS_ERROR_MESSAGE = 'Wrong username or password.';
const NO_USER_FOUND = 'No user has been found, please register first.';

function displayErrorMessage(message) {
    generalErrorEl.textContent = message;
    generalErrorEl.classList.remove(DISPLAY_NONE);
}

function validateUsernameAndPassword(username, password) {
    const login = localStorage.getItem('login');
    
    if (!login) {
        displayErrorMessage(NO_USER_FOUND);
        return false;
    }

    const loginData = JSON.parse(login);
    const user = loginData.find((user) => (user.username === username));

    if (!user || user.password !== password) {
        displayErrorMessage(USERNAME_PASS_ERROR_MESSAGE);
        return false;
    }

    generalErrorEl.classList.add(DISPLAY_NONE);
    localStorage.setItem('currentUser', user.id);
    return true;
}

function handleLoginFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(formEl);

    const username = formData.get('username');
    const password = formData.get('password');

    if (!username) {
        usernameErrorEl.textContent = `Username ${REQUIRED_ERROR_MESSAGE}`;
        usernameErrorEl.classList.remove(DISPLAY_NONE);
        usernameEl.focus();
        return;
    }
    
    usernameErrorEl.classList.add(DISPLAY_NONE);

    if (!password) {
        passwordErrorEl.textContent = `Password ${REQUIRED_ERROR_MESSAGE}`;
        passwordErrorEl.classList.remove(DISPLAY_NONE);
        passwordEl.focus();
        return;
    }
    
    passwordErrorEl.classList.add(DISPLAY_NONE);
    
    formEl.reset();

    if (validateUsernameAndPassword(username, password)) {
        redirect('/dashboard.html');
    }
}

function init() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    redirect('/dashboard.html');
}

formEl.addEventListener('submit', handleLoginFormSubmit);

init();
