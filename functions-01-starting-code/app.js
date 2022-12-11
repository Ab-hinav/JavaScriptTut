const startGameBtn = document.getElementById('start-game-btn');


const start = function startGame() {
  console.log('Game is starting...');
};

// anyonmous function
const myfoo = function() {
    console.log('Hello World');
};

startGameBtn.addEventListener('click', start);

const person = {
    name: 'Max',
    greet: function greet() {
        console.log('Hi, I am ' + this.name);
    }
}

person.greet();  //this is a method

const copiedPerson = {...person};
console.log(startGame);
console.dir(startGame);

// using anyonmous function
// startGameBtn.addEventListener('click', function() {
//     console.log('Game is starting...');
// });
