
const tachStart = document.querySelector('button[data-start]');
const tachStop = document.querySelector('button[data-stop]');

tachStart.addEventListener('click', changeColor);
tachStop.addEventListener('click', onBtnStop);

const INTERVAL_DELAY = 1000;
let intervalId = null;

 function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

function  changeColor() {
    intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_DELAY);
    tachStart.disabled = true;
};

function onBtnStop() {
    clearInterval(intervalId);
    tachStart.disabled = false;
}
