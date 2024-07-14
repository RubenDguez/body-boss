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

function updateWorkout(id, data) {
    const workoutList = getWorkoutList();
    const filteredWorkout = workoutList.filter((wOut) => (wOut.id != id));
    const currentWorkout = workoutList.find((wOut) => (wOut.id == id));
    const timestamp = new Date().getTime();
    const updatedWorkout = {...currentWorkout, ...data, updatedAt: timestamp}
    const updateStoreData = [...filteredWorkout, updatedWorkout];

    const localStorageWorkoutData = localStorage.getItem(WORKOUT);
    const parsedLocalStorageWorkoutData = JSON.parse(localStorageWorkoutData);
    const currentUser = parseInt(localStorage.getItem('currentUser'));

    const updatedLocalStorageWorkoutData = {...parsedLocalStorageWorkoutData, [currentUser]: [...updateStoreData]};


    localStorage.setItem(WORKOUT, JSON.stringify(updatedLocalStorageWorkoutData));

    location.reload();
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
    event.stopPropagation();
    const formEl = document.querySelectorAll('form')[1];

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

function openWorkout(id) {
    const workout = getWorkoutList().find((workout) => (workout.id == id));
    if (!workout) return;
    
    const editWorkoutModalEl = document.getElementById('editWorkoutModal');
    editWorkoutModalEl.classList.remove(DISPLAY_NONE);

    const editWorkoutTypeEl = document.getElementById('editWorkoutType');
    const editGoalEl = document.getElementById('editGoal');
    const editActualEl = document.getElementById('editActual');
    const editNotesEl = document.getElementById('editNotes');
    const editWorkoutCancelButtonEl = document.getElementById('editWorkout_cancelButton');

    editWorkoutTypeEl.value = workout.type;
    editGoalEl.value = workout.goal;
    editActualEl.value = workout.actual;
    editActualEl.setAttribute('min', workout.actual)
    editActualEl.setAttribute('max', workout.goal)
    editNotesEl.value = workout.notes;

    const formEl = document.querySelectorAll('form')[2];

    formEl.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(formEl);
        const data = {
            ...workout,
            type: formData.get('editWorkoutType'),
            goal: parseInt(formData.get('editGoal')),
            actual: parseInt(formData.get('editActual')),
            notes: formData.get('editNotes')
        }

        updateWorkout(id, data);
    });

    editWorkoutCancelButtonEl.addEventListener('click', function() {
        editWorkoutModalEl.classList.add(DISPLAY_NONE);
    });
}

/**
 * Add Workout Section
 * @param {*} workout 
 * @returns {void}
 * @description Function to add a workout section to the page
 */
function addWorkoutSection(workout) {
    if (workout.actual === workout.goal) return;

    const yourWorkoutContainerEl = document.getElementById('yourWorkoutContainer');

    const sectionWrapper = document.createElement('section');
    sectionWrapper.setAttribute('class', 'rounded bg-sky-600 pointer');
    sectionWrapper.setAttribute('data-id', workout.id);

    const divWrapper = document.createElement('div');
    divWrapper.setAttribute('class', 'flex min-[300px]:flex-col md:flex-row bg-sky-200 py-5 ml-2');
    divWrapper.setAttribute('style', 'align-items: center;')

    const header = document.createElement('h2');
    header.setAttribute('class', 'pl-3 font-bold md:min-w-52 md:max-w-52 text-left');
    const createdAt = new Date(workout.createdAt).toLocaleDateString();
    header.textContent = `${workout.type}: ${createdAt}`;

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'grow min-[300px]:px-4');
    paragraph.textContent = workout.notes;

    const statParagraph = document.createElement('p');
    statParagraph.setAttribute('class', 'text-right pr-3 md:min-w-52 italic text-sky-600');
    statParagraph.textContent = `${workout.actual} of ${workout.goal}`

    divWrapper.appendChild(header);
    divWrapper.appendChild(paragraph);
    divWrapper.appendChild(statParagraph);
    sectionWrapper.appendChild(divWrapper);

    yourWorkoutContainerEl.appendChild(sectionWrapper);

    sectionWrapper.addEventListener('click', function () {
        openWorkout(sectionWrapper.dataset.id);
    })
}

function addWorkouts() {
    const workouts = getWorkoutList();

    if (!workouts.length) {
        return;
    }

    workouts
    .toSorted((a, b) => (b.createdAt - a.createdAt))
    .forEach((workout) => {
        addWorkoutSection(workout);
    });
}

addWorkouts();

submitForm.addEventListener('submit', submitWorkout);

document.getElementById('newWorkout_cancelButton').addEventListener('click', function () {
    document.getElementById('newWorkoutModal').classList.add('display-none');
})
