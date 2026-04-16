const delay = ms => new Promise(res => setTimeout(res, ms*1000));
console.clear()
var alarmtone = new Audio('alarm-tone-1.mp3')
alarmtone.loop = "true"
var clicktone = new Audio('click.mp3')
clicktone.volume = .5
function playClickTone(){
    clicktone.currentTime = 0
    clicktone.play().catch(() => {})
}

document.addEventListener("click", function(e){
    const button = e.target.closest("button")
    if (button && !button.disabled){
        playClickTone()
    }
})


let mode
let military = false
let secondsDisplay = true;
let clockAnimation = true;
let secondsToWait

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

let timerUpDiv = document.getElementById("timerUpDiv")
let timerUpDivBut = timerUpDiv.getElementsByTagName("button")[0]
timerUpDivBut.onclick = function(){
    timerUpDiv.style.opacity = "0"
    timerUpDiv.style.pointerEvents = "none"
    alarmtone.pause()
}
let stylesDiv = document.getElementById("stylesDiv")
let stylesCloseBut = document.getElementById("stylesDivCloseButton")
stylesCloseBut.onclick = function(){
    stylesDiv.style.opacity = "0"
    stylesDiv.style.pointerEvents = "none"
}


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

document.getElementById("themesButton").onclick = function(){
    stylesDiv.style.opacity = "1"
    stylesDiv.style.pointerEvents = "all"
}

document.getElementById("settingsCloseButton").onclick = function(){
    document.getElementById("settings").style.opacity = "0"
    document.getElementById("settings").style.pointerEvents = "none"
}

document.getElementById("militaryToggleButton").onclick = function(){
    military = !military
    updateClock()
    if (military){
        localStorage.setItem("militaryTimeSetting","on")
    }
    else if (!military){
        localStorage.setItem("militaryTimeSetting","off")
    }
}

document.getElementById("secondsToggleButton").onclick = function(){
    secondsDisplay = !secondsDisplay
    updateClock()
    if (secondsDisplay){
        localStorage.setItem("secondsTimeSetting","on")
    }
    else if (!secondsDisplay){
        localStorage.setItem("secondsTimeSetting","off")
    }
}

document.getElementById("animationToggleButton").onclick = function(){
    clockAnimation = !clockAnimation
    updateClock()
    if (clockAnimation){
        localStorage.setItem("animationTimeSetting","on")
    }
    else if (!clockAnimation){
        localStorage.setItem("animationTimeSetting","off")
    }
}


clockButtonEl.onclick = function(){
    mode = "clock"
    document.getElementById("clockButton").classList.add("selected")
    document.getElementById("timerButton").classList.remove("selected")
    document.getElementById("timerDiv").style.opacity = "0"
    document.getElementById("timerDiv").style.pointerEvents = "none"
    updateClock()
}

timerButtonEl.onclick = function(){
    mode = "timer"
    document.getElementById("clockButton").classList.remove("selected")
    document.getElementById("timerButton").classList.add("selected")
    document.getElementById("timerDiv").style.opacity = "1"
    document.getElementById("timerDiv").style.pointerEvents = "all"
    updateClock()
}


function updateClock(){
    if (mode == "clock"){
        const currentDate = new Date()
        const currentHour = currentDate.getHours()
        if (military){
            hourEl.textContent = currentHour
        }
        else{
            if (currentHour > 12){
                hourEl.textContent = currentHour-12
                meridiemEl.textContent = "PM"
            }
            else{
                hourEl.textContent = currentHour == 0 ? 12 : currentHour
                meridiemEl.textContent = "AM"
            }
        }
        if (currentDate.getMinutes() < 10){
            minuteEl.textContent = "0"+currentDate.getMinutes().toString()
            
        }
        else{
            minuteEl.textContent = currentDate.getMinutes()
        }
        if (secondsDisplay){
            secondEl.style.display=""
            colon2El.style.display=""
            if (currentDate.getSeconds() < 10){
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
        secondEl.style.display=""
        colon2El.style.display=""
        let timerMode
        let timerTimeButEl = document.getElementById("timerTimeBut")
        timerTimeButEl.onclick = function(){
            timerMode = "time"
            startTimer()
        }
        let timerClockButEl = document.getElementById("timerClockBut")
        timerClockButEl.onclick = function(){
            timerMode = "clock"
            startTimer()
        }
        function startTimer(){
            let timerDivEl = document.getElementById("timerDiv")
            timerDivEl.style.opacity = "0"
            timerDivEl.style.pointerEvents = "none"
            if (timerMode == "time"){
                const currentDate = new Date()
                let hours = document.getElementById("timerTimeHour").value
                let minutes = document.getElementById("timerTimeMinute").value
                let seconds = document.getElementById("timerTimeSeconds").value
                secondsToWait = 0
                if (Number.isNaN(parseInt(hours))){
                    hours = 0
                }
                if (Number.isNaN(parseInt(minutes))){
                    minutes = 0
                }
                if (Number.isNaN(parseInt(seconds))){
                    seconds = 0
                }
                secondsToWait += parseInt(hours)*60*60
                secondsToWait += parseInt(minutes)*60
                secondsToWait += parseInt(seconds)+1
                updateTimerClock()
                let id = setInterval(updateTimerClock,1000)
                function updateTimerClock(){
                    if (mode == "timer"){
                        clockButtonEl.onclick = function(){
                            clearInterval(id)
                            mode = "clock"
                            document.getElementById("clockButton").classList.add("selected")
                            document.getElementById("timerButton").classList.remove("selected")
                            document.getElementById("timerDiv").style.opacity = "0"
                            document.getElementById("timerDiv").style.pointerEvents = "none"
                            updateClock()
                            return;
                        }
                        timerButtonEl.onclick = function(){
                            clearInterval(id)
                            mode = "timer"
                            document.getElementById("clockButton").classList.remove("selected")
                            document.getElementById("timerButton").classList.add("selected")
                            document.getElementById("timerDiv").style.opacity = "1"
                            document.getElementById("timerDiv").style.pointerEvents = "all"
                            updateClock()
                            return
                        }
                        if (secondsToWait > 0){
                            secondsToWait -= 1
                            console.log(secondsToWait)
                            hourEl.textContent = Math.floor(secondsToWait/3600)
                            if (hourEl.textContent.length == 1){
                                hourEl.textContent = "0"+hourEl.textContent
                            }
                            minuteEl.textContent = Math.floor(secondsToWait%3600/60)
                            if (minuteEl.textContent.length == 1){
                                minuteEl.textContent = "0"+minuteEl.textContent
                            }
                            secondEl.textContent = Math.floor(secondsToWait%60)
                            if (secondEl.textContent.length == 1){
                                secondEl.textContent = "0"+secondEl.textContent
                            }
                            if (clockAnimation){
                                secondEl.style.animation = 'none';
                                secondEl.offsetHeight;
                                secondEl.style.animation = "textPop .1s"
                            }
                            meridiemEl.style.display = "none"
                        }
                        else{
                            clearInterval(id)
                            timerUp()
                        }
                    }
                    else{
                        clearInterval(id)
                        updateClock()
                    }
                }
            }
            else if (timerMode == "clock"){

            }
        }
    }
}

function timerUp(){
    alarmtone.play()
    timerUpDiv.style.opacity = "1"
    timerUpDiv.style.pointerEvents = "all"
    timerUpDiv.children[0].style.animation = 'none';
    timerUpDiv.children[0].offsetHeight;
    timerUpDiv.children[0].style.animation = "timerUpDiv .9s cubic-bezier(0.22, 1, 0.36, 1)"
    mode = "clock"
    document.getElementById("clockButton").classList.add("selected")
    document.getElementById("timerButton").classList.remove("selected")
    document.getElementById("timerDiv").style.opacity = "0"
    document.getElementById("timerDiv").style.pointerEvents = "none"
    updateClock()
}

function handleLocalStorage(){
    if (localStorage.getItem("militaryTimeSetting") == null){
        localStorage.setItem("militaryTimeSetting","off")
    }
    else if (localStorage.getItem("militaryTimeSetting") == "on"){
        military = true
    }
    else{
        military = false
    }

    if (localStorage.getItem("secondsTimeSetting") == null){
        localStorage.setItem("secondsTimeSetting","off")
    }
    else if (localStorage.getItem("secondsTimeSetting") == "on"){
        secondsDisplay = true
    }
    else{
        secondsDisplay = false
    }

    if (localStorage.getItem("animationTimeSetting") == null){
        localStorage.setItem("animationTimeSetting","off")
    }
    else if (localStorage.getItem("animationTimeSetting") == "on"){
        clockAnimation = true
    }
    else{
        clockAnimation = false
    }
    if (localStorage.getItem("theme") == null){
        localStorage.setItem("theme","basic")
    }
    else{
        let theme = localStorage.getItem("theme")
        console.log(theme+'.css')
        if (theme=="basic"){
            document.getElementById('themeStylesheet').setAttribute('href','basic.css')
        }
        else{
            document.getElementById('themeStylesheet').setAttribute('href',theme+'.css')
        }
    }
}

handleLocalStorage()
updateClock()
setInterval(updateClock,1000)