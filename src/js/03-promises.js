import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);
  let delay = Number(event.currentTarget.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
      })
      
      .catch(({ position, delay }) => {
       
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
      }
      
      ); delay += step;  }
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   const objectPromise = { position, delay };

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//     if (shouldResolve) {
//       resolve(objectPromise);
//     }
//     reject(objectPromise);
//   });}, delay);
// }
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}