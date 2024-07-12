const submitForm = document.getElementById("submit");

function submitWorkout(event) {
    event.preventDefault();
    const workoutType = document.getElementById('workoutType');
    const duration = document.getElementById('duration');
    const frequency = document.getElementById('frequency');
    const notes = document.getElementById('notes');
    let isValid = true;

    // Validate workout type

    const workoutTypeError = document.getElementById('workoutTypeError');
    if (workoutType.value === "") {
        workoutTypeError.textContent = "select workout type"
        workoutTypeError.style.display = "please select work out";
        localStorage.setItem("workoutType")
        document.getElementById("workoutType").innerHTML = sessionStorage.getItem("workoutType");
        isValid = false;
    } else {
        workoutTypeError.style.display = "none";
    }

    // / Validate Duration
    const durationError = document.getElementById('durationError');
    if (duration.value === "" || duration.value < 1 || duration.value > 120) {
        durationError.textContent = "enter duration between 1 and 120"
        durationError.style.display = "please set duration";
        document.getElementById("duration").innerHTML = sessionStorage.getItem("duration");
        isValid = false;
    } else {
        workoutTypeError.style.display = "none";
    }

    // / Validate Frequncey
    const frequncey = document.getElementById('frequency');
    const frequnceyError = document.getElementById('frequency');
    if (frequncey.value === "" || frequncey.value < 1 || frequncey.value > 7) {
        workoutTypeError.textContent = "enter valid ferquency"
        workoutTypeError.style.display = "block";
        localStorage.setItem("frequncey")
        document.getElementById("frequncey").innerHTML = sessionStorage.getItem("Frequncey");
        isValid = false;
    } else {
        workoutTypeError.style.display = "none";
    }
    const notesEl = document.getElementById('notes')
    if (isValid) {
        const data = {
            type: workoutType.value,
            actual: 0,
            goal: frequency.value,
            notes: notesEl.value,
        }
        
        localStorage.setItem("workout", JSON.stringify(data));
        alert('Workout data saved successfully!')
    }
}

console.log(submitForm)
submitForm.addEventListener("submit", submitWorkout);
