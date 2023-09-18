const buttons = document.querySelectorAll('button');
// const fn2 = () => {console.log('fn2')}; 
// button.addEventListener('click',fn1);
// button.addEventListener('click',fn2);
function fn1(e) {
    // alert('fn1');
    // e.target.disabled = true;
    console.log(e);
}
// if we bind then a new fn is created
// const bnfn = fn1.bind(this);

// setTimeout(()=>{
//     button.removeEventListener('click',fn1);

// },2000);

buttons.forEach(button => { button.addEventListener('mouseenter', fn1); });


// window.addEventListener('scroll',(e)=>{console.dir(e)});

let curElementNumber = 0;

function scrollHandler() {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;

    if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}
window.addEventListener('scroll', scrollHandler);

// read data from a form
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target);
    for (const input of e.target) {
        if (input.value.length > 0) {
            console.log(input.value);
        }
    }
});

const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    console.log('click btn');
});

const div = document.querySelector('div');
div.addEventListener('click', (e) => {
    console.log('click div');
},true);

// there are two phases  i.e event capturing and event bubbling
// event capturing is done by default and means that the event is captured by parent ancestors and then trickles down to the actual element 
// the opposite of this is event bubbling

// event propagation is done by default and means that the event is propagated upwards from the actual element to the parent ancestors

// event.stopPropagation(); - to stop the propagation of the event 
// also not all event bubble up
// event.stopImmediatePropagation(); - to stop the propagation of the event and also stop the bubbling of the event ,i.e incase you have attached multiple events to a element

// event delegation - means that you attach an event listener to a parent element for handling events for the child

// example

// const list = document.querySelectorAll('li');

// list.forEach(li => {
//     li.addEventListener('click', (e) => {
//         e.target.classList.toggle('highlight');
//     });
// });

const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
    // e.target.classList.toggle('highlight');
    e.target.closest('li').classList.toggle('highlight');

    btn.click(); // this simulates the click event on the button

    // form.submit(); // this simulates the submit event on the form



})
