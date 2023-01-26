// window.alert("Hello, world!");
// console.log(document);


// const h1 = document.querySelector('h1');

// h1.textContent = 'Hello, world!';
// h1.style.color = 'red';
// h1.style.backgroundColor = 'black';

// const li = document.querySelector('li:last-of-type');
// li.textContent = li.textContent + ' (changed!)';

// const body = document.body;


// const listItemElements = document.querySelectorAll('li');

// for (const listItemEl of listItemElements) {
//     console.dir(listItemEl);
//     }


const section = document.querySelector('section');
// section.className = '';

const button = document.querySelector('button');

let but = button.addEventListener('click', () => {
    
    // section.classList.toggle('visible');
    section.classList.toggle('invisible');

    });

