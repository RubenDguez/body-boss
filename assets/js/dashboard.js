const idEl = document.getElementById('id');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const emailEl = document.getElementById('email');

const currentUser = getCurrentUser();

console.log(currentUser);

idEl.textContent = currentUser.id;
firstNameEl.textContent = currentUser.firstName;
lastNameEl.textContent = currentUser.lastName;
emailEl.textContent = currentUser.email;
