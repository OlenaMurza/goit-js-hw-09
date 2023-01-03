
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

// input.addEventListener('click, ');
// buttonStart.addEventListener('click');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  // ВИБІР ДАТИ
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      buttonStart.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

// ВІДЛІК ЧАСУ
function convertMs(ms) {
// Кількість мілісекунд в одиницю часу 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Залишок днів
  const days = Math.floor(ms / day);
  // Залишок годин
  const hours = Math.floor((ms % day) / hour);
  // Залишок мінут
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Залишок секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  costructor() {
    this.timerId = null;
    this.isActive = false;
    buttonStart.disable = true;
  }
// таймер запущено
  startTimer() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      // різниця між обраним часом і поточним часом
      const deltaTime = selectedTime - currentTime;

      const componentTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentTimer);
      if (deltaTime <= 0) {
        this.stopTimer();
      }

    }, 1000);
  }

updateComponentsTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  hours.textContent = hours;
  minutes.textContent = minutes;
  seconds.textContent = seconds;
}

stopTimer(){
  clearInterval(this.timerID);
} 
}

const timer = new Timer();
flatpickr(inputDate, options);
buttonStart.addEventListener('click', () => timer.startTimer());

