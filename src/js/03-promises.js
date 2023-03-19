import Notiflix from 'notiflix'

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });// Fulfill
      } else {
        reject({ position, delay });// Reject
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(e.target.elements.delay.value);
  let step = Number(e.target.elements.step.value);
  let amount = Number(e.target.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  };
}

