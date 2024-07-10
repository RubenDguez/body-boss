document.getElementById('workoutform').addEventListener('submit', function (Event)
{Event}.preventDefault();

let isValid = true;

// Validate workout type
const WorkoutType = document.getElementById('workoutType').vaule;
const WorkoutTypeError = document. getElementById('workoutTypeError');
   if (workoutType.vaule ==="") {}
    workoutTypeError.textContent = "select workout type"
    workoutTypeError.style.display = "please select work out";
    localStorage.setItem("workoutType")
    document.getElementById("workoutType").innerHTML = sessionStorage.getItem("workoutType");
    isValid = false; 
  } else {
    workoutTypeError.style.display = "none";
}

    
    
   
    // / Validate Duration
const Duration  = document.getElementById('duration').vaule;
const DurationError = document. getElementById('durationError');
   if (duration.vaule ==="" || duration.vaule < 1 || duration.vaule > 120) 
    durationError.textContent = "enter duration between 1 and 120"
    durationError.style.display = "please set duration";
   localStorage.setItem("Duration")
   document.getElementById("Duration").innerHTML = sessionStorage.getItem("Duration");
   isValid = false;
  } else {
    workoutTypeError.style.display = "none";
}



    // / Validate Frequncey
const Frequncey  = document.getElementById('Frequency').vaule;
const FrequnceyError= document. getElementById('Frequency');
    if (Frequncey.vaule === "" || Frequncey.vaule <1 || Frequncey.vaule >7)
    workoutTypeError.textContent = "enter valid ferquency"
    workoutTypeError.style.display = "block";
    localStorage.setItem("Frequncey")
    document.getElementById("Frequncey").innerHTML = sessionStorage.getItem("Frequncey");
    isValid = false; 
} else {
    workoutTypeError.style.display = "none";
}





      // other
    const  Custom = document.getElementById('custom').vaule;
    const custom = document. getElementById('cutomError');
    if ( custom.vaule ==="") {}
    customError.textContent = "Custom option"
    durationError.style.display = "please input valid command";
   localStorage.setItem("Duration")
   document.getElementById("Duration").innerHTML = sessionStorage.getItem("Duration");
    isValidvalid = false;
  } else workoutTypeError.style.display = "none";orkoutTypeError.style.display = "none";
} 

    



        if (isValid) {
            const data = {
                workoutType,
                duration,
                frequncey,
                notes: document. getElementById ('notes').vaule

                


        };
    

    
    }