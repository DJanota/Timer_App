class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() { // resets the stopwatch
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    resetTimer() {
        this.stop();
        this.reset();
        this.print();
    }

    print() { // inserts text under 'display' attribute (text created with the below 'format' method)
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) { // check if the timer is not running
            this.running = true; // if so, turn it on
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() { // checks if the timer is working
        if (!this.running) return;
        this.calculate(); // if so, calculate miliseconds, secs and mins (below)
        this.print(); // prints the result of the calculation
    }

    calculate() {
        this.times.miliseconds += 1; // we are constantly adding a milisecond
        if (this.times.miliseconds >= 100) { // 1000 / 10 = 100 (one second has 1000 miliseconds; in the 'start' method we set 10ms interval); // if the number of miliseconds reaches 100, we add one second
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) { // if the number of seconds reaches 60, we add one minute
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
}

// pad0 function adds '0' to one-digit numbers
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch( // 'Stopwatch' class instance
    document.querySelector('.stopwatch'));

// click buttons methods
var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());
