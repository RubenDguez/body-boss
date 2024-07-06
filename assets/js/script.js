/**
 * Redirect
 * @param {*} url 
 * @description
 * Function to redirect to another page
 */
function redirect(url) {
    location.href = url;
}

/**
 * Get Login Data
 * @returns {Array<>}
 * @description
 * Function to get the login data from Local Storage
 */
function getLoginData() {
    let login = localStorage.getItem('login');
    login ? login = JSON.parse(login) : login = [];

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
    users ? users = JSON.parse(users) : users = [];

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

    console.log(currentUser);
    console.log(users);
    
    const user = users.find((user) => (user.id == currentUser))

    console.log('User: ', user)
    return user;
}

/**
 * Log Out
 * @description
 * Function to log out the current user
 */
function logout() {
    localStorage.removeItem('currentUser');
    redirect('../index.html');
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
})();
