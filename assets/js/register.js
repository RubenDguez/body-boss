const formEl = document.querySelector('form');
const generalErrorEl = document.getElementById('generalError');

// constants
const DISPLAY_NONE = 'display-none';
const REQUIRED_ERROR_MESSAGE = 'field is required.';

/**
 * Validate Empty Field
 * @param {*} data 
 * @returns {boolean}
 * @description
 * Function to validate if the fields are empty
 */
function validateEmptyField(data) {
    for (const key of Object.keys(data)) {
        const errorMessage = document.getElementById(`${key}Error`);
        if (!data[key]) {
            errorMessage.classList.remove(DISPLAY_NONE);
            return false;
        }
        errorMessage.classList.add(DISPLAY_NONE);
    }

    return true;
}

/**
 * Validate Password
 * @param {*} password 
 * @param {*} confirmPassword 
 * @returns {boolean}
 * @description
 * Function to validate if the password matches the confirm
 */
function validatePasswordMatch(password, confirmPassword) {
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.'
        confirmPasswordError.classList.remove(DISPLAY_NONE);
        return false;
    }

    confirmPasswordError.classList.add(DISPLAY_NONE);
    return true;
}

/**
 * Validate Username
 * @param {*} username 
 * @returns {boolean}
 * @description
 * Function to validate if the username is already in use
 */
function validateUsername(username) {
    let login = getLoginData();

    if (!login.length) return true;

    generalErrorEl.classList.add(DISPLAY_NONE);

    for (const data of login) {
        console.log(data.username)
        if (data.username === username) {
            generalErrorEl.textContent = 'This username has already been registered, do you want to login instead?'
            generalErrorEl.classList.remove(DISPLAY_NONE);
            return false;
        }
    }

    return true;
}

/**
 * Validate Email
 * @param {*} email 
 * @returns {boolean}
 * @description
 * Function to validate if the email is already registered
 */
function validateEmail(email) {
    let users = getUsersData();

    if (!users.length) return true;

    generalErrorEl.classList.add(DISPLAY_NONE);

    for (const user of users) {
        if (user.email === email) {
            generalErrorEl.textContent = 'This email has already been registered, do you want to login instead?'
            generalErrorEl.classList.remove(DISPLAY_NONE);
            return false;
        }
    }

    return true;
}

/**
 * Add User
 * @param {*} data 
 * @description
 * Function to add users to the Local Storage
 */
function addUser(data) {
    const login = getLoginData();
    login.push({ id: data.id, username: data.username, password: data.password });
    setLoginData(login);

    const users = getUsersData();
    users.push(data);
    setUsersData(users);
}

/**
 * Handle Registration Form
 * @param {*} event 
 * @description
 * Function to handle the registration form
 */
function handleRegistrationForm(event) {
    event.preventDefault();

    const formData = new FormData(formEl);

    const data = {
        firstName: formData.get('firstName') || '',
        lastName: formData.get('lastName') || '',
        email: formData.get('email') || '',
        gender: formData.get('gender') || '',
        username: formData.get('username') || '',
        password: formData.get('password') || '',
        confirmPassword: formData.get('confirmPassword') || '',
    }

    if (!validateEmptyField(data) || !validatePasswordMatch(data.password, data.confirmPassword) || !validateEmail(data.email) || !validateUsername(data.username)) {
        return;
    }

    data.id = Date.now();;
    addUser(data);
    formEl.reset();
    redirect('index.html');
}

// Event Listener
formEl.addEventListener('submit', handleRegistrationForm);
