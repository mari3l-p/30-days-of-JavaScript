let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const timerEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds)
    displayEnd(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        } else {
            displayTime(secondsLeft);
        }

    }, 1000)
}


function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.textContent = display;
    document.title = display
    console.log(`${minutes}:${seconds}`);
}

function displayEnd(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes()
    timerEnd.textContent = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}


function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const mins = parseInt(this.minutes.value);
    timer(mins * 60)
    this.reset()
})
