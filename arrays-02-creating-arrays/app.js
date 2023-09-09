const numbers = [1, 2, 3];
console.log(numbers);

// const moreNumbers = Array(5, 2);
// console.log(moreNumbers);

// const yetMoreNumbers = Array.of(1, 2);
// console.log(yetMoreNumbers);

const listItems = document.querySelectorAll('li');
console.log(listItems);

const arrayListItems = Array.from(listItems);
console.log(arrayListItems);


const hobbies = ['Cooking', 'Sports'];
const personalData = [20, 'Abhi', {moreDetail: []}];
const analyticsData = [[1, 1.6], [-5.4, 2.1],2];

for (const data of analyticsData) {
    if (Array.isArray(data)) {
        for (const dataPoint of data) {
            console.log(dataPoint);
        }
    }else{
        console.log(data);
    }
}

console.log(personalData[1]);
// push ,pop ,unshift, shift
hobbies.push('Reading');
hobbies.unshift('Coding');
const poppedValue = hobbies.pop();
hobbies.shift();
console.log(hobbies);

hobbies[1] = 'Coding';
hobbies[5] = 'Reading';
console.log(hobbies, hobbies[4]);

// splice - add and remove elements , first argument is the index from where you want to start, second argument is the number of elements you want to remove, third argument is the element you want to add
hobbies.splice(1, 0, 'Good Food');
console.log(hobbies);
hobbies.splice(0,1);
console.log(hobbies);
hobbies.splice(2,3);
console.log(hobbies);

// methods to copy an array
const testResults = [1, 5.3, 1.5, 10.99, -5,1.5 ,10];
// const storedResults = testResults; // this will create a reference to the original array
const storedResults = testResults.slice();
const storedResults2 = Array.from(testResults);
const storedResults3 = [...testResults];
const storedResults4 = testResults.concat();
testResults.push(5.91);
console.log(storedResults, storedResults2, storedResults3, testResults);

// using slice method
const selectedTestResults = testResults.slice(2);
console.log(selectedTestResults);
const selectedTestResults3 = testResults.slice(2, 4);
console.log(selectedTestResults3);

// using concat method
const moreTestResults = [1, 2, 3];
const combinedTestResults = testResults.concat(moreTestResults);
console.log(combinedTestResults);

// using indexof, lastindexof, includes, find, findIndex
console.log(testResults.indexOf(1.5));
console.log(testResults.includes(10.99));
console.log(testResults.lastIndexOf(1.5));

const personData = [{name: 'Abhi'}, {name: 'Max'}];

console.log(personData.indexOf({name: 'Max'})); // this will return -1 because indexOf uses === to compare the values it ends up comparing the reference of the object and not the object itself

// this will return {name: 'Abhi} because find runs a function on each element of the array and returns the first element for which the function returns true , here the object is same as the object in the array
console.log(personData.find((person,idx,persons) => { return person.name === 'Abhi'}));

// get 0 
console.log(personData.findIndex((person,idx,persons) => { return person.name === 'Abhi'}));


// using foreach , loops
const prices = [10.99, 5.99, 3.99, 6.59];

const taxAdjustedPrices = [];

for (let i=0 ; i<prices.length ; i++) {
    taxAdjustedPrices.push(prices[i] * 1.1);
}

for (const price of prices) {
    taxAdjustedPrices.push(price * 1.1);
}

prices.forEach( (price, idx, prices) => {
    const priceObj = {index: idx, taxAdjustedPrice: price * 1.1};
    taxAdjustedPrices.push(priceObj);
})

console.log(taxAdjustedPrices);


// map method - returns a new array with the results of calling a provided function on every element in the calling array
const prices2 = [10.99, 5.99, 3.99, 6.59];
const taxAdjustedPrices2 = prices2.map((price, idx, prices) => {
    const priceObj = {index: idx, taxAdjustedPrice: price * 1.1};
    return priceObj;
});

console.log(prices2, taxAdjustedPrices2);


// sort and reverse
const prices3 = [10.99, 5.99, 3.99, 6.59];
prices3.sort();
console.log(prices3);
// by default sort method converts the elements to string and then sorts them
// to sort numbers we need to pass a function to the sort method

prices3.sort((a,b) => {
    if (a > b) {
        return 1;
    }else if(a === b){
        return 0;
    }else{
        return -1;
    }
});
console.log(prices3);

// reverse
console.log(prices3.reverse());


// filter method - creates a new array with all elements that pass the test implemented by the provided function
const filteredArray = prices3.filter((price,idx,prices) => {
    return price > 6;
});
console.log(filteredArray);

// writing the above function in a shorter way
const filteredArray2 = prices3.filter(price => price > 6);

// map method - returns a new array with the results of calling a provided function on every element in the calling array


//use chaining to combine multiple array methods
const filteredArray3 = prices3.filter(price => price > 6).map(price => ({price: price})).reduce((prevValue, curValue) => prevValue + curValue.price, 0);
console.log(filteredArray3);


// split and join
const data = 'new york;10.99;2000';
const transformedData = data.split(';');
console.log(transformedData);
// convert string in array to number
const transformedData2 = data.split(';').map((item) => {
    return +item;
});
// how does +item work ?
// +item is same as Number(item)

console.log('fds',transformedData2);

const nameFragments = ['Abhi', 'Singh'];
const names = nameFragments.join(' ');
console.log(names);


// spread operator - used to split up array elements or object properties
const copiedNameFragments = [...nameFragments];
console.log(copiedNameFragments);
const persons = [{name: 'Abhi', age: 30}, {name: 'Max', age: 31}];
const copiedPersons = [...persons];
persons.push({name: 'Anna', age: 29});
const copiedPersons2 = persons.map(person => ({name: person.name, age: person.age}));
persons[0].age = 31;
const cp4 = persons.map(person => ({name: person.name, age: person.age}));
console.log(persons, copiedPersons);
console.log(copiedPersons2);
console.log(cp4);

console.log(Math.min(...prices3));


// array destructuring
const sample = ['Abhi', 'Singh', 30, 1.79];
const [firstName, lastName, ...otherInfo] = sample;
console.log(firstName, lastName, otherInfo);











