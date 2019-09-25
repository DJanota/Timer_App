'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            // resets the stopwatch
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: 'resetTimer',
        value: function resetTimer() {
            this.stop();
            this.reset();
            this.print();
        }
    }, {
        key: 'print',
        value: function print() {
            // inserts text under 'display' attribute (text created with the below 'format' method)
            this.display.innerText = this.format(this.times);
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));

            // pad function adds '0' to one-digit numbers
            function pad0(value) {
                var result = value.toString();
                if (result.length < 2) {
                    result = '0' + result;
                }
                return result;
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                // check if the timer is not running
                this.running = true; // if so, turn it on
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            // checks if the timer is working
            if (!this.running) return;
            this.calculate(); // if so, calculate miliseconds, secs and mins (below)
            this.print(); // prints the result of the calculation
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.times.miliseconds += 1; // we are constantly adding a milisecond
            if (this.times.miliseconds >= 100) {
                // 1000 / 10 = 100 (one second has 1000 miliseconds; in the 'start' method we set 10ms interval); // if the number of miliseconds reaches 100, we add one second
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                // if the number of seconds reaches 60, we add one minute
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }]);

    return Stopwatch;
}();

var stopwatch = new Stopwatch( // 'Stopwatch' class instance
    document.querySelector('.stopwatch'));

// click buttons methods
var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.resetTimer();
});
