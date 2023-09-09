

class Person {
    name ='Abhi'

    constructor(age){
        this.age = age
    }

    greet(){
        console.log(`Hello ${this.name} i am ${this.age} years old`)
    }
}


//constructor function

function Person1() {
    this.name = 'Abhi'
    this.age = 25
    this.greet = function(){
        console.log(`Hello ${this.name} i am ${this.age} years old`)
    }
}

Person1.prototype = {
     greetRandom(){
    console.log(`random greet`);
}
}
    
let person = new Person(25);
console.dir(person);
person.greet()
let person1 = new Person1()
person1.greet()
console.log(person1.__proto__);
console.log(person1.__proto__ === Person1.prototype);
person1.greetRandom();



//explain prototypes



