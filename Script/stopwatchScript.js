// Fetching all the required elements
var startBtn = document.getElementById("start-btn");
var stopBtn = document.getElementById("stop-btn");
var resetBtn = document.getElementById("reset-btn");
var hoursDisplay = document.getElementById("hours");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var miliSecondsDisplay = document.getElementById("miliSeconds");
var appContainer = document.getElementById("container");
var watchIcon = document.getElementById("watch-icon");
var lapList = document.getElementById("laps-list");

// Declaring global variable to store interval ID
var intervalId;

// Adding click event listner to start button
startBtn.addEventListener("click", function(){
    
    // Setting interval to run every 50 mili Seconds and storing interval id
    intervalId = setInterval(startWatch, 50);

    // Disabling start button on starting stop watch
    startBtn.disabled = true;

    // Adding classes to enable animations to stopwatch icon and blinking shadow
    startBtn.classList.add('grey-bg');
    appContainer.classList.add('watch-start-shadow');
    watchIcon.classList.add('watch-start-movingWatch');

});

// Adding click event listner to Stop button
stopBtn.addEventListener("click", function(){

    // clearing interval to stop on stop button click
    clearInterval(intervalId);

    // Again enabling start button
    startBtn.disabled = false;

    // Removing classes to stop animation effects
    startBtn.classList.remove('grey-bg');
    appContainer.classList.remove('watch-start-shadow');
    watchIcon.classList.remove('watch-start-movingWatch');

    // Adding li element to list with current time of stopwatch
    // i.e. Adding Lap
    let hours = hoursDisplay.textContent;
    let minutes = minutesDisplay.textContent;
    let seconds = secondsDisplay.textContent;
    let miliSeconds = miliSecondsDisplay.textContent;

    // creating li element
    let lap = document.createElement("li");
    lap.textContent = `${hours} : ${minutes} : ${seconds} : ${miliSeconds}`;

    // appending li Element to list
    lapList.appendChild(lap);

});


// Adding click event listner to Stop button
resetBtn.addEventListener("click", function(){

    // clearing interval to stop on resetting clock
    // Making all count zero
    clearInterval(intervalId);
    secondsDisplay.textContent = pad(0, 2);
    minutesDisplay.textContent = pad(0, 2);
    hoursDisplay.textContent = pad(0, 2);
    miliSecondsDisplay.textContent = pad(0, 3);

    // Enabling disabled start button in case we reset running watch
    startBtn.disabled = false;

    // Removing classes to stop animation effects
    startBtn.classList.remove('grey-bg');
    appContainer.classList.remove('watch-start-shadow');
    watchIcon.classList.remove('watch-start-movingWatch');

    // Removing all the laps added to list
    lapList.replaceChildren();

});


// Function executing after every 50 miliSecond interval
function startWatch(){
    let hours = hoursDisplay.textContent;
    let minutes = minutesDisplay.textContent;
    let seconds = secondsDisplay.textContent;
    let miliSeconds = miliSecondsDisplay.textContent/50;

    incMilis(miliSeconds, seconds, minutes, hours);
}

// checking mili second count if reached 1000
// resetting to zero if reached
// otherwise increment by one
function incMilis(miliSeconds, seconds, minutes, hours){
    miliSeconds++;
    if(miliSeconds>=20){
        miliSecondsDisplay.textContent = 000;
        incSec(seconds, minutes, hours);
        return;
    }
    miliSecondsDisplay.textContent = pad(miliSeconds*50, 3);
}


// checking second count if reached 60
// resetting to zero if reached
// otherwise increment by one
function incSec(seconds, minutes, hours){
    seconds++;
    if(seconds>=60){
        secondsDisplay.textContent = 00;
        incMin(minutes, hours);
        return;
    }
    secondsDisplay.textContent = pad(seconds, 2);
}


// checking minute count if reached 60
// resetting to zero if reached
// otherwise increment by one
function incMin(minutes, hours){
    minutes++;
    if(minutes>=60){
        minutesDisplay.textContent = 00;
        incHour(hours);
        return;
    }
    minutesDisplay.textContent = pad(minutes, 2);
}

// incrementing hour by one
function incHour(hours){
    hours++;
    hoursDisplay.textContent = pad(hours, 2);
}

// pad function for adding leading zeroes to string
function pad(num, places){
    return String(num).padStart(places, 0);
}