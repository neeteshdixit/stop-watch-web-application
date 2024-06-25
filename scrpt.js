let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function displayTime() {
    document.querySelector('.display').textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            displayTime();
        }, 10);
        document.getElementById('startButton').textContent = 'Resume';
        document.getElementById('pauseButton').disabled = false;
    } else {
        // Resume button clicked
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startButton').textContent = 'Start';
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startButton').textContent = 'Resume';
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    displayTime();
    document.getElementById('startButton').textContent = 'Start';
    document.getElementById('pauseButton').disabled = true;
    document.querySelector('.laps').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        laps.push(elapsedTime);
        let lapTime = laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        document.querySelector('.laps').appendChild(lapItem);
    }
}

// Initial display
displayTime();