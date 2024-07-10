document.getElementById('workoutform').addEventListener('submit', function (event) { 
    event.preventDefault();
});

let isValid = true;

// Validate workout type
const workoutType = document.getElementById('workoutType');
const workoutTypeError = document.getElementById('workoutTypeError');
if (workoutType.vaule === "") {
    workoutTypeError.textContent = "select workout type"
    workoutTypeError.style.display = "please select work out";
    localStorage.setItem("workoutType")
    document.getElementById("workoutType").innerHTML = sessionStorage.getItem("workoutType");
    isValid = false;
} else {
    workoutTypeError.style.display = "none";
}

// / Validate Duration
const duration = document.getElementById('duration');
const durationError = document.getElementById('durationError');
if (duration.vaule === "" || duration.vaule < 1 || duration.vaule > 120) {
    durationError.textContent = "enter duration between 1 and 120"
    durationError.style.display = "please set duration";
    localStorage.setItem("duration")
    document.getElementById("duration").innerHTML = sessionStorage.getItem("Duration");
    isValid = false;
} else {
    workoutTypeError.style.display = "none";
}

// / Validate Frequncey
const frequncey = document.getElementById('frequency');
const frequnceyError = document.getElementById('frequency');
if (frequncey.vaule === "" || frequncey.vaule < 1 || frequncey.vaule > 7) {
    workoutTypeError.textContent = "enter valid ferquency"
    workoutTypeError.style.display = "block";
    localStorage.setItem("frequncey")
    document.getElementById("frequncey").innerHTML = sessionStorage.getItem("Frequncey");
    isValid = false;
} else {
    workoutTypeError.style.display = "none";
}

// other
const custom = document.getElementById('custom');
const customError = document.getElementById('cutomError');
if (custom.vaule === "") {
    customError.textContent = "custom option"
    durationError.style.display = "please input valid command";
    localStorage.setItem("Duration")
    document.getElementById("Duration").innerHTML = sessionStorage.getItem("Duration");
    isValidvalid = false;
} else {
    workoutTypeError.style.display = "none";
}





if (isValid) {
    const data = {
        workoutType,
        duration,
        frequncey,
        notes: document.getElementById('notes').vaule




    };



}