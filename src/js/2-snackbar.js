import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const btn = form.querySelector('button');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    
btn.disabled =true;
 
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    createPromise(delay, state)
    .then((delayValue) => {
        iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${delayValue}ms`,
position: 'topRight',
backgroundColor: '#59A10D',
messageColor: '#FFF',
titleColor: '#FFF',
 /* icon: 'ico-success',  */
    theme: 'dark'
        });
    })
.catch((delayValue) => {
    iziToast.error({
        title:'Error',
        message: `Rejected promise in ${delayValue}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FFF',
titleColor: '#FFF',
/*  icon: 'ico-error',  */
    theme: 'dark'
    });
})
   .finally(() => {
      form.reset();
     btn.disabled = false;
   });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}