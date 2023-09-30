
const userId = 'u123';
const user = {
    name: 'Max',
    age: 32,
    hobbies: ['sports','cooking']
};

const btn = document.getElementById('store-btn');
const getBtn = document.getElementById('retrieve-btn');

// local storage survives the page reload and closing of tab and browser
// session storage will not - gets cleared once the page is closed

btn.addEventListener('click',setMyLocalStorege);

function setMyLocalStorege() {
    localStorage.setItem('userId',userId);
    localStorage.setItem('userData',JSON.stringify(user))
}

getBtn.addEventListener('click',() => {
    let val = JSON.parse(localStorage.getItem('userData'));
    alert(JSON.stringify(val));
})