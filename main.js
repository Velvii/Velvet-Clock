const delay = ms => new Promise(res => setTimeout(res, ms*1000));
console.clear()

let mode
let military = false
let secondsDisplay = true;
let clockAnimation = true;
console.log()

mode = "clock"
let hourEl = document.getElementById("hour")
let colon1El = document.getElementById("colon1")
let minuteEl = document.getElementById("minute")
let colon2El = document.getElementById("colon2")
let secondEl = document.getElementById("second")
let meridiemEl = document.getElementById("meridiem")

let clockButtonEl = document.getElementById("clockButton")
let timerButtonEl = document.getElementById("timerButton")

let settingsDiv = document.getElementById("settings")

let settingsButtonEl = document.getElementById("settingsButton")
settingsButtonEl.onclick = function(){
    settingsDiv.style.opacity = "1"
    settingsDiv.style.pointerEvents = "all"
    settingsDiv.style.filter = "drop-shadow(.2vw -.2vw black)"
    settingsDiv.style.transform = "none"
}

let themesButtonEl = document.getElementById("themesButton")

let settingsCloseButtonEl = document.getElementById("settingsCloseButton")
settingsCloseButtonEl.onclick = function(){
    settingsDiv.style.opacity = "0"
    settingsDiv.style.pointerEvents = "none"
    settingsDiv.style.filter = "none"
    settingsDiv.style.transform = "translate(1vw, -1vw)"
}

document.getElementById("militaryToggleButton").onclick = function(){
    military = !military
    updateClock()
}

document.getElementById("secondsToggleButton").onclick = function(){
    secondsDisplay = !secondsDisplay
    updateClock()
}

document.getElementById("animationToggleButton").onclick = function(){
    clockAnimation = !clockAnimation
    updateClock()
}



function updateClock(){
    if (mode == "clock"){
    const currentDate = new Date()
    if (military){
        hourEl.textContent = currentDate.getHours()
    }
    else{
        if (currentDate.getHours() > 12){
            hourEl.textContent = currentDate.getHours()-12
            meridiemEl.textContent = "PM"
        }
        else{
            hourEl.textContent = currentDate.getHours();
            meridiemEl.textContent = "AM"
        }
    }
    if (currentDate.getMinutes() <= 10){
        minuteEl.textContent = "0"+currentDate.getMinutes().toString()
        
    }
    else{
        minuteEl.textContent = currentDate.getMinutes()
    }
    if (secondsDisplay){
        secondEl.style.display = ""
        colon2El.style.display = ""
        if (currentDate.getSeconds() <= 10){
            if (clockAnimation){
                secondEl.style.animation = 'none';
                secondEl.offsetHeight;
                secondEl.style.animation = "textPop .1s"
            }
            secondEl.textContent = "0"+currentDate.getSeconds().toString()
        }
        else{
            if (clockAnimation){
                secondEl.style.animation = 'none';
                secondEl.offsetHeight;
                secondEl.style.animation = "textPop .1s"
            }
            secondEl.textContent = currentDate.getSeconds()
        }
    }
    else{
        secondEl.style.display = "none"
        colon2El.style.display = "none"
    }
    }
    if (military){
        meridiemEl.style.display = "none"
    }
    else{
        meridiemEl.style.display = ""
    }
}





updateClock()
setInterval(updateClock,1000)