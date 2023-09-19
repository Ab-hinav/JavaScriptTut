function add(num1,nums2){
    return num1+nums2;
}

console.log(add(2,3)); // pure function

function addRandom(num1){
    return num1+Math.random();
}

console.log(addRandom(2)); // impure function

const hobiies = ['gaming','music','coding'];

function printHobiies(hobiies){
    hobiies.push('reading');
    console.log(hobiies);
}

printHobiies(hobiies); // side effects - not pure

// factory functions - example

function createTaxCalculator(tax){
    return function(amount){
        return amount*tax;
    }
}

const calcVatAmount = createTaxCalculator(0.1);
const calcincomeTaxAmount = createTaxCalculator(0.25);

console.log(calcVatAmount(100));
console.log(calcincomeTaxAmount(100));

// closures
// every function is a closure in js
// closures are a function that has access to the variables of the outer function
let name1 = 'XXXX';


function greetusr(){
    // let name = 'Anna';
    console.log(`hi ${name1}`);
}

name1 = 'fds';

greetusr();

// functions remember the surrounding variables



function powerOfn(x,n){
    return n==1 ?x : x * powerOfn(x,n-1);
}



function getFriendNames(person){
    const collectNames = [];
    if (!person.friends){
        return collectNames;
    }

    for (const friend of person.friends){
        collectNames.push(friend.name);
        collectNames.push(...getFriendNames(friend));
    }

    return collectNames;
}