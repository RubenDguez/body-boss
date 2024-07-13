/**
 * Redirect
 * @param {*} url 
 * @description
 * Function to redirect to another page
 */
function redirect(url) {
    const currentUrl = document.location.href.split('/')[2];

    const isLocalDev = (currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1'));
    const baseUrl = isLocalDev ? '' : '/body-boss/'

    const isIndex = url.includes('index.html');

    location.href = baseUrl.concat(isIndex ? '/index.html' : url);
}

/**
 * Get Login Data
 * @returns {Array<>}
 * @description
 * Function to get the login data from Local Storage
 */
function getLoginData() {
    let login = localStorage.getItem('login');
    if (login) {
        login = JSON.parse(login);
    } else {
        login = []
    }

    return login;
}

/**
 * Get Users Data
 * @returns {Array<>}
 * @description
 * Function to get the users data from Local Storage
 */
function getUsersData() {
    let users = localStorage.getItem('users');
    if (users) {
        users = JSON.parse(users) 
    } else {
        users = []
    }

    return users;
}

/**
 * Set Login Data
 * @param {*} data 
 * @description
 * Function to set the login data to Local Storage
 */
function setLoginData(data) {
    localStorage.setItem('login', JSON.stringify(data));
}

/**
 * Set Login Data
 * @param {*} data 
 * @description
 * Function to set the login data to Local Storage
 */
function setUsersData(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

/**
 * Set Current user
 * @param {*} data 
 * @description
 * Function to set the current logged in user id
 */
function setCurrentUser(id) {
    localStorage.setItem('currentUser', id);
}

/**
 * Get Current User
 * @returns {*}
 * @description
 * Function to get the current logged in user
 */
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    const users = getUsersData();

    const user = users.find((user) => (user.id == currentUser))

    return user;
}

/**
 * Log Out
 * @description
 * Function to log out the current user
 */
function logout() {
    localStorage.removeItem('currentUser');
    redirect('index.html');
}

// Event Listeners
const logoutEl = document.getElementById('logout');
if (logoutEl) {
    logoutEl.addEventListener('click', logout);
}

(() => {
    const body = document.body;
    const noscript = document.createElement('noscript');
    noscript.textContent = 'Your browser does not support JavaScript!';
    body.appendChild(noscript);

    const currentUser = getCurrentUser();
    const currentPage = document.location.href;
    if (!currentUser && !currentPage.includes('index.html') && !currentPage.includes('register.html')) {
        redirect('index.html');
    }
})();
