class Course{
    #price =0;
    constructor(title,length,price){
        this.title = title;
        this.length = length;
        this.#price = price;
    }

    priceperlength(){
        return this.length / this.#price;
    }

    get getPrice(){
        return `/$${this.#price}`;
    }

    set setPrice(val){
        if (val>0){
            this.#price = val;
        }
        return;
    }

    courseSummary(){
        return `this is costs ${this.#price} and is of length ${this.length}`
    }


}

class PracticalCourse extends Course {

    numOfExercises =0;
    constructor(title,length,price){
        super(title,length,price);
    }

    set numOfExercises(val){
        this.numOfExercises = val;
    }

    get numOfExercises(){
        return this.numOfExercises;
    }


}

class TheoreticalCourse extends Course{

    constructor(title,length,price){
        super(title,length,price);
    }

    publish(){
        console.log("something");
    }

}


const course1 = new Course('abc',248,12);
const course2 = new Course('bvc',567,11);

console.log(course1);
console.log(course2);

