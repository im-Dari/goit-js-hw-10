import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

startBtn.disabled = true;

let selectedDate = null;
let timerId = null;


flatpickr(input, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];

        if (pickedDate <= new Date ()) {
            
        iziToast.show({
    message: '<strong>Error</strong> Please choose a date in the future',
    position: 'topRight', 
    backgroundColor: '#e74c3c',
    messageColor: '#ffffff',
    iconColor: '#ffffff',
    icon: 'ico-error', 
    theme: 'dark',
    close: true,
    closeColor: '#ffffff',
});

        } else {
            selectedDate = pickedDate;
            startBtn.disabled = false;
        }
    },
});

startBtn.addEventListener( "click", () => {
    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const diff = selectedDate - now;

        if ( diff <= 0) {
            clearInterval(timerId);
            updateTimer(convertMs(0));
         input.disabled = false; 
         startBtn.disabled = true;
         return;
        }

        updateTimer(convertMs(diff));
    }, 1000);
});

function updateTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
