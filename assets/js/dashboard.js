const idEl = document.getElementById('id');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const emailEl = document.getElementById('email');
const profileButtonEl = document.getElementById('profileButton');
const bmiCalcButtonEl = document.getElementById('bmiCalcButton')
const profileModalEl = document.getElementById('profileModal');
const bmiCalcModalEl = document.getElementById('bmiCalcModal')

const DISPLAY_NONE = 'display-none';

let currentUser;

function handleDisplayProfileModal() {
    const errorMessageEl = document.getElementById('profileModal_generalError');
    errorMessageEl.textContent = ''
    errorMessageEl.classList.add(DISPLAY_NONE);

    profileModalEl.classList.toggle(DISPLAY_NONE);
}

function handleDisplayBMICalcModal() {
    const errorMessageEl = document.getElementById('bmiCalcModal_generalError');
    errorMessageEl.textContent = ''
    errorMessageEl.classList.add(DISPLAY_NONE);

    bmiCalcModalEl.classList.toggle(DISPLAY_NONE);
}

function handleCancelBMICalcModal() {
    location.reload();
}

function validateEmail(email) {
    const users = getUsersData().filter((user) => (user.id !== currentUser.id));

    if (!users.length) return true;

    const isValid = users.find((user) => (user.email === email)) === undefined; 

    if (!isValid) {
        const errorMessageEl = document.getElementById('profileModal_generalError');
        errorMessageEl.textContent = 'Email is already in use.'
        errorMessageEl.classList.remove(DISPLAY_NONE);
    }

    return isValid
}

function validateUsername(username) {
    const users = getUsersData().filter((user) => (user.id !== currentUser.id));
    
    if (!users.length) return true;

    const isValid = users.find((user) => (user.username === username)) === undefined;

    if (!isValid) {
        const errorMessageEl = document.getElementById('profileModal_generalError');
        errorMessageEl.textContent = 'Username is already in use.'
        errorMessageEl.classList.remove(DISPLAY_NONE);
    }

    return isValid
}

function validateEmptyFields(data) {
    for (const key of Object.keys(data)) {
        const errorMessage = document.getElementById(`profileModal_${key}Error`);
        if (!data[key]) {
            errorMessage.classList.remove(DISPLAY_NONE);
            return false;
        }
        errorMessage.classList.add(DISPLAY_NONE);
    }

    return true;
}

function validateUserInformation(data) {
    const info = {...data};
    delete info.password;
    delete info.confirmPassword;

    return (validateEmptyFields(info) && validateUsername(info.username) && validateEmail(info.email));
}

function validatePassword(password, confirmPassword) {
    const errorMessageEl = document.getElementById('profileModal_confirmPasswordError');
    
    if (password !== confirmPassword) {
        errorMessageEl.textContent = 'Passwords do not match'
        errorMessageEl.classList.remove(DISPLAY_NONE);
        return false;
    }

    return true;
}

function save(data) {
    const info = {...data}; 
    const users = getUsersData().filter((user) => (user.id !== currentUser.id));
    const logins = getLoginData().filter((user) => (user.id !== currentUser.id));

    delete info.confirmPassword; // confirm password is not needed in the user object

    // if password is empty, remove it
    if (!info.password) {
        delete info.password;
    }

    // if password, encrypt it
    if (info.password) {
        info.password = CryptoJS.MD5(`${info.password}${info.username}`).toString();
    }

    // update USERS in local storage 
    users.push({...currentUser, ...info});
    localStorage.setItem('users', JSON.stringify(users));

    // update LOGINS in local storage
    logins.push({id: currentUser.id, username: info.username, password: info.password || currentUser.password});
    localStorage.setItem('login', JSON.stringify(logins));
}

function handleSave(event) {
    event.stopPropagation();
    event.preventDefault();   
    const formEl = document.querySelector('form');
    const formData = new FormData(formEl);
    const data = {
        firstName: formData.get('profileModal_firstName') || '',
        lastName: formData.get('profileModal_lastName') || '',
        email: formData.get('profileModal_email') || '',
        username: formData.get('profileModal_username') || '',
        password: formData.get('profileModal_password') || '',
        confirmPassword: formData.get('profileModal_confirmPassword') || '',
    }

    const isValidInformation = validateUserInformation(data);
    const isValidPassword = validatePassword(data.password, data.confirmPassword);

    if (isValidInformation && isValidPassword) {
        save(data);
        handleDisplayProfileModal();
        location.reload();
    }
}

function handleCancel() {
    handleDisplayProfileModal();
}

function calculateBMI(event) {
    event.stopPropagation();
    event.preventDefault();

    const calculateBMIFormEl = document.querySelectorAll('form')[1];
    const calcOutput = document.getElementById('bmiCalcModal_calcOutput');
    const calcNumber = document.getElementById('bmiCalcModal_calcNumber');
    const bmiMeaning = document.getElementById('bmiCalcModal_bmiMeaning');
    const formData = new FormData(calculateBMIFormEl);
    const results = {};

    const data = {
        feet: parseInt(formData.get('bmiCalcModal_feet')) || 0,
        inch: parseInt(formData.get('bmiCalcModal_inches')) || 0,
        weight: parseFloat(formData.get('bmiCalcModal_pounds')) || 0,
    }

    const inches = (data.feet * 12) + data.inch;

    if (inches === 0 || data.weight === 0) {
        return;
    }

    const bmi = (data.weight / inches / inches) * 703;

    if (bmi < 18.4) {
        results.message = 'Under weight';
        results.color = 'blue'
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
        results.message = 'Normal weight';
        results.color = 'green';
    } 
    if (bmi >=25 && bmi <= 29.9) {
        results.message = 'Overweight';
        results.color = 'yellow';
    }
    if (bmi >= 30 && bmi <= 34.9) {
        results.message = 'Obese';
        results.color = 'orange';
    }
    if (bmi >= 35) {
        results.message = 'Extremely Obese';
        results.color = 'red';
    }

    calcOutput.classList.add(`text-${results.color}-600`, `bg-${results.color}-200`);
    calcOutput.classList.remove(DISPLAY_NONE);
    
    calcNumber.textContent = `Your BMI: ${bmi.toFixed(1)}`;
    bmiMeaning.textContent = results.message;
}

profileButtonEl.addEventListener('click', function() {
    const pModal = 'profileModal_'
    const formEl = document.querySelector('form');
    const firstNameEl = document.getElementById(pModal.concat('firstName'));
    const lastNameEl = document.getElementById(pModal.concat('lastName'));
    const emailEl = document.getElementById(pModal.concat('email'));
    const usernameEl = document.getElementById(pModal.concat('username'));
    const cancelButton = document.getElementById(pModal.concat('cancelButton'));

    handleDisplayProfileModal()
    
    firstNameEl.value = currentUser.firstName;
    lastNameEl.value = currentUser.lastName;
    emailEl.value = currentUser.email;
    usernameEl.value = currentUser.username;

    formEl.addEventListener('submit', handleSave);
    cancelButton.addEventListener('click', handleCancel);
});

bmiCalcButtonEl.addEventListener('click', function() {
    const cancelButtonEl = document.getElementById('bmiCalcModal_cancelButton');
    const calculateBMIFormEl = document.querySelectorAll('form')[1];

    handleDisplayBMICalcModal();

    console.log(calculateBMIFormEl);

    cancelButtonEl.addEventListener('click', handleCancelBMICalcModal);
    calculateBMIFormEl.addEventListener('submit', calculateBMI);
});

document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        profileModalEl.classList.add(DISPLAY_NONE);
        bmiCalcModalEl.classList.add(DISPLAY_NONE);
    }
});

(() => {
    currentUser = getCurrentUser();
    idEl.textContent = currentUser.id;
    firstNameEl.textContent = currentUser.firstName;
    lastNameEl.textContent = currentUser.lastName;
    emailEl.textContent = currentUser.email;
})();
