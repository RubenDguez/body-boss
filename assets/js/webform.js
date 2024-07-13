const newWorkoutModal = document.getElementById('newWorkoutModal')
const submitForm = document.getElementById('newWorkout_form');

const workoutTypeEl = document.getElementById('workoutType');
const workoutTypeError = document.getElementById('workoutTypeError');

const goalEl = document.getElementById('goal');
const goalErrorEl = document.getElementById('goalError')

const notesEl = document.getElementById('notes');
const notesErrorEl = document.getElementById('notesError');

const WORKOUT = 'workout';

/**
 * Validate Data
 * @param {*} data 
 * @returns {boolean}
 * @description
 * Function to validate the workout data
 */
function validateData(data) {
    // Validate workout type
    if (data.type === '') {
        workoutTypeError.textContent = 'select workout type';
        workoutTypeEl.classList.remove(DISPLAY_NONE);
        return false;
    }
    workoutTypeError.classList.add(DISPLAY_NONE);

    // validate goal
    if (data.goal < 1) {
        goalErrorEl.textContent = 'Enter valid frequency';
        goalErrorEl.classList.remove(DISPLAY_NONE);
        return false;
    }
    goalErrorEl.classList.add(DISPLAY_NONE);

    // validate notes
    if (data.notes === '') {
        notesErrorEl.textContent = 'Enter a valid note';
        notesErrorEl.classList.remove(DISPLAY_NONE);
        return false;
    }
    notesErrorEl.classList.add(DISPLAY_NONE);

    return true;
}

/**
 * Get Workout List
 * @returns {Array}
 * @description
 * Function to get the workout list from local storage by currently logged in user
 */
function getWorkoutList() {
    const workout = localStorage.getItem(WORKOUT)
    if (!workout) return [];

    const data = JSON.parse(workout);
    const currentUser = localStorage.getItem('currentUser');

    if (data[currentUser] === undefined) return [];

    return data[currentUser];
}

/**
 * Save Workout
 * @param {*} data 
 * @returns {void}
 * @description
 * Function to save the workout data to local storage
 */
function saveWorkout(data) {
    const workoutList = getWorkoutList();
    const storedWorkout = JSON.parse(localStorage.getItem(WORKOUT)) || [];
    const currentUser = localStorage.getItem('currentUser');
    const timestamp = new Date().getTime();
    const workout = { ...storedWorkout, [currentUser]: [...workoutList, { id: timestamp, createdAt: timestamp, updatedAt: timestamp, ...data }] }

    localStorage.setItem(WORKOUT, JSON.stringify(workout));
}

/**
 * Submit Workout
 * @param {*} event
 * @returns {void}
 * @description
 * Function to submit the workout form
 */
function submitWorkout(event) {
    event.preventDefault();
    const formEl = document.querySelectorAll('form')[2];

    const formData = new FormData(formEl);

    let data = {
        type: formData.get('workoutType'),
        goal: parseInt(formData.get('goal')) || 1,
        notes: formData.get('notes'),
    }

    const isValidData = validateData(data);

    if (isValidData) {
        data = { ...data, actual: 0 }

        saveWorkout(data);
        location.reload();
    }
}

submitForm.addEventListener('submit', submitWorkout);

document.getElementById('newWorkout_cancelButton').addEventListener('click', function () {
    document.getElementById('newWorkoutModal').classList.add('display-none');
})
