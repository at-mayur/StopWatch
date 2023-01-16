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


var intervalId;

startBtn.addEventListener("click", function(){
    
    intervalId = setInterval(startWatch, 50);
    startBtn.disabled = true;
    startBtn.classList.add('grey-bg');
    appContainer.classList.add('watch-start-shadow');
    watchIcon.classList.add('watch-start-movingWatch');

});

stopBtn.addEventListener("click", function(){

    clearInterval(intervalId);
    startBtn.disabled = false;
    startBtn.classList.remove('grey-bg');
    appContainer.classList.remove('watch-start-shadow');
    watchIcon.classList.remove('watch-start-movingWatch');

    let hours = hoursDisplay.textContent;
    let minutes = minutesDisplay.textContent;
    let seconds = secondsDisplay.textContent;
    let miliSeconds = miliSecondsDisplay.textContent;
    let lap = document.createElement("li");
    lap.textContent = `${hours} : ${minutes} : ${seconds} : ${miliSeconds}`;

    lapList.appendChild(lap);

});

resetBtn.addEventListener("click", function(){

    clearInterval(intervalId);
    secondsDisplay.textContent = pad(0, 2);
    minutesDisplay.textContent = pad(0, 2);
    hoursDisplay.textContent = pad(0, 2);
    miliSecondsDisplay.textContent = pad(0, 3);
    startBtn.disabled = false;
    startBtn.classList.remove('grey-bg');
    appContainer.classList.remove('watch-start-shadow');
    watchIcon.classList.remove('watch-start-movingWatch');

    lapList.replaceChildren();

});

function startWatch(){
    let hours = hoursDisplay.textContent;
    let minutes = minutesDisplay.textContent;
    let seconds = secondsDisplay.textContent;
    let miliSeconds = miliSecondsDisplay.textContent/50;

    incMilis(miliSeconds, seconds, minutes, hours);
}

function incMilis(miliSeconds, seconds, minutes, hours){
    miliSeconds++;
    if(miliSeconds>=20){
        miliSecondsDisplay.textContent = 000;
        incSec(seconds, minutes, hours);
        return;
    }
    miliSecondsDisplay.textContent = pad(miliSeconds*50, 3);
}

function incSec(seconds, minutes, hours){
    seconds++;
    if(seconds>=60){
        secondsDisplay.textContent = 00;
        incMin(minutes, hours);
        return;
    }
    secondsDisplay.textContent = pad(seconds, 2);
}

function incMin(minutes, hours){
    minutes++;
    if(minutes>=60){
        minutesDisplay.textContent = 00;
        incHour(hours);
        return;
    }
    minutesDisplay.textContent = pad(minutes, 2);
}

function incHour(hours){
    hours++;
    hoursDisplay.textContent = pad(hours, 2);
}


function pad(num, places){
    return String(num).padStart(places, 0);
}