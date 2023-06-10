// // creating objects
// let person = {
//     name: 'John',
//     age: 30,
//     hobbies: ['reading', 'music', 'movies'],
//     greet : function() {
//         alert('Hi there!');
//     }
// };

// // person.greet();

// // accessing object properties
// console.log(person.name);

// // accessing object properties using bracket notation
// console.log(person['name']);
// person['hah hah'] = 'hah hah';
// console.log(person['hah hah']);
// // all property names are converted to strings
// const movieList = document.getElementById('movie-list');
// movieList.style['background-color'] = 'red';
// movieList.style.backgroundColor = 'red';
// movieList.style.display = 'block';


// // updating object properties
// person.name = 'Max';
// console.log(person.name);

// // adding new properties to an object
// person.isAdmin = true;
// console.log(person);

// // deleting properties from an object
// delete person.age;
// console.log(person);

// // using the this keyword
// let person2 = {
//     name: 'JohnNew',
//     age: 30,
//     hobbies: ['reading', 'music', 'movies'],
//     greet : function() {
//         alert('Hi there! I am ' + this.name);
//     },
//     1.5: 'hello' 
// };
// // console.log(person2.greet());

// console.log(person2[1.5]);
// // objects are like dictionaries

// // order of properties is numbers will be sorted
// // but other properties will be in the order they were added

const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');
const movies = [];

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if(title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
        return;
    }

    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random(1000)
    };

    movies.push(newMovie);
    console.log(newMovie);
    clearMovieInput();
    addMovieToList(newMovie);
    renderMovies(movies);
}

const renderMovies = (movies) => {
    if( movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    }
    
    movieList.classList.add('visible');
    movieList.innerHTML = '';

    for(const movie of movies) {
        let movieEl = document.createElement('li');
        let text = movie.info.title + ' - ';
        for(const key in movie.info) {
            if(key !== 'title') {
                text = text + `${key}: ${movie.info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    }


}
   
const searchMovieHandler = () =>{
    let filter = document.getElementById('filter-title').value;
    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));
    renderMovies(filteredMovies);

}


const clearMovieInput = () => {
    document.getElementById('title').value = '';
    document.getElementById('extra-name').value = '';
    document.getElementById('extra-value').value = '';
};

const addMovieToList = (movie) => {
    const movieEl = document.createElement('li');
    let text = movie.info.title + ' - ';
    for(const key in movie.info) {
        if(key !== 'title') {
            text = text + `${key}: ${movie.info[key]}`;
        }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);




// spread operator
/*
const person = {
    name: 'Max',
    hobbies: ['Sports', 'Cooking']
};

const anotherPerson = person;
person.age = 30;
console.log(anotherPerson);

const person2 = {
    ...person
};

person.age = 31;
console.log(person2);

const person3 = {
    ...person,
    age: 32,
    hobbies: [...person.hobbies]
};

person.age = 33;
console.log(person3);
console.log(person.hobbies.pop());
console.log(person3);


*/

































