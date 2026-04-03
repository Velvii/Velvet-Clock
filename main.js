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

let timerClockMeridiemButtonEl = document.getElementById("timerClockMeridiem")
let timerClockMeridiem = "AM"
timerClockMeridiemButtonEl.textContent = timerClockMeridiem

timerClockMeridiemButtonEl.onclick = function(){
    if (timerClockMeridiem == "AM"){
        timerClockMeridiem = "PM"
    }
    else{
        timerClockMeridiem = "AM"
    }
    timerClockMeridiemButtonEl.textContent = timerClockMeridiem
}

document.getElementById("settingsButton").onclick = function(){
    document.getElementById("settings").style.opacity = "1"
    document.getElementById("settings").style.pointerEvents = "all"
}

document.getElementById("settingsCloseButton").onclick = function(){
    document.getElementById("settings").style.opacity = "0"
    document.getElementById("settings").style.pointerEvents = "none"
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


clockButtonEl.onclick = function(){
    mode = "clock"
    document.getElementById("clockButton").classList.add("selected")
    document.getElementById("timerButton").classList.remove("selected")
    document.getElementById("timerDiv").style.opacity = "0"
    document.getElementById("timerDiv").style.pointerEvents = "none"
}

timerButtonEl.onclick = function(){
    mode = "timer"
    document.getElementById("clockButton").classList.remove("selected")
    document.getElementById("timerButton").classList.add("selected")
    document.getElementById("timerDiv").style.opacity = "1"
    document.getElementById("timerDiv").style.pointerEvents = "all"
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
            secondEl.style.display=""
            colon2El.style.display=""
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
            secondEl.style.display="none"
            colon2El.style.display="none"
        }
        if (military){
            meridiemEl.style.display="none"
        }
        else{
            meridiemEl.style.display=""
        }
    }
    else if (mode == "timer"){
    }
}
updateClock()
setInterval(updateClock,1000)