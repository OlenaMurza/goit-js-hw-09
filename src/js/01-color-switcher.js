
const touchStart = document.querySelector('button[data-start]');
const touchStop = document.querySelector('button[data-stop]');

touchStart.addEventListener('click', changeColor);
touchStop.addEventListener('click', onBtnStop);

const INTERVAL_DELAY = 1000;
let intervalId = null;
touchStop.disabled = true;

 function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

function changeColor() {
    intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_DELAY);
    touchStart.disabled = true;
    touchStop.disabled = false;
};

function onBtnStop() {
    clearInterval(intervalId);
    touchStart.disabled = false;
    touchStop.disabled = true;
}
