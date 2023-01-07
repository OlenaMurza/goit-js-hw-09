
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;
const inputDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysDate = document.querySelector('span[data-days]');
const hoursDate = document.querySelector('span[data-hours]');
const minutesDate = document.querySelector('span[data-minutes]');
const secondsDate = document.querySelector('span[data-seconds]');

// ВІДЛІК ЧАСУ
function convertMs(ms) {
// Кількість мілісекунд в одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Залишок днів
  const days = addLeadingZero(Math.floor(ms / day));
  // Залишок годин
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Залишок хвилин
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Залишок секунд
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // ВИБІР ДАТИ
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      buttonStart.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};


class Timer {
  constructor() {
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
      const currentTime = new Date();
      // різниця між обраним часом і поточним часом
      const deltaTime = selectedTime - currentTime;

      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      if (deltaTime <= 0) {
        this.stopTimer();
      }

    }, 1000);
  }

  updateComponentsTimer({ days, hours, minutes, seconds }) {
  daysDate.textContent = days;
  hoursDate.textContent = hours;
  minutesDate.textContent = minutes;
  secondsDate.textContent = seconds;
}

stopTimer(){
  clearInterval(this.timerID);
}
}

const timer = new Timer();
flatpickr(inputDate, options);
buttonStart.addEventListener('click', () => timer.startTimer());

