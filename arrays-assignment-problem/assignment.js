
// let userInput = prompt("Enter a number: ");
//array destructuring
// 
// set default value for userInput
let userInput = 12;
checkIfUserInputIsNumber(userInput);


let numbers = createAnArrayOfLength(userInput);
printArray(numbers);

let finalResult = numbers.filter((num)=> { return num>5;}).map((num) => {return {val:num , isEven: num%2===0}}).reduce((acc, curr) => {return acc + curr.val}, 0);
console.log(finalResult);

let [max,min] = findMax(...numbers);
console.log(min,max);

let [max1,min1] = findMax(1,2,3,4,5,6,7,8,9,10);
console.log(min1,max1);

let nonDuplicateArray = [];
let wset = new Set();

function addToNonDuplicateArray(num) {
    if (!wset.has(num)) {
        nonDuplicateArray.push(num);
        // create a reference to the object
        wset.add(num);
    }
}

function removeFromNonDuplicateArray(num) {
    if (wset.has(num)) {
        nonDuplicateArray.splice(nonDuplicateArray.indexOf(num), 1);
        wset.delete(num);
    }
}

addToNonDuplicateArray(1);
addToNonDuplicateArray(2);
addToNonDuplicateArray(3);
addToNonDuplicateArray(2);
addToNonDuplicateArray(1);

printArray(nonDuplicateArray);



function findMax(...args) {
  let max = args[0];
  let min = args[0];
  for (let i = 0; i < args.length; i++) {
    if (args[i] > max) {
      max = args[i];
    }
    if (args[i] < min) {
        min = args[i];
    }
  }
  return [max, min];
}


function checkIfUserInputIsNumber(userInput) {
  if (isNaN(userInput) || userInput === null || userInput === "") {
    // alert("You did not enter a number");
  } else {
    // alert("You entered a number");
    userInput = parseInt(userInput);
  }
}

function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Index ${i} : ${array[i]}`);
  }
}

function createAnArrayOfLength(userInput) {
  let array = [];
  for (let i = 0; i < userInput; i++) {
    array.push(Math.floor(Math.random() * 10));
  }
  return array;
}



