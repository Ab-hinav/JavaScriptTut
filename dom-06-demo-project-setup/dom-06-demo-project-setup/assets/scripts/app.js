const addMovieModal = document.getElementById('add-modal');
// const addMovieModal2 = document.body.children[1];
console.log(addMovieModal);
const movies = [];

// query selector here selects the header tag and the first button in it
const startAddMovieButton = document.querySelector('header button');
// // const startAddMovieButton2 = document.querySelector('header').lastElementChild;
// console.log(startAddMovieButton);

const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const addAddMovieButton = cancelAddMovieButton.nextElementSibling;
// query selector all here selects all the inputs in the add movie modal
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const areYouSureModal = document.getElementById('delete-modal');

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none';
    }
}

const deleteMoviebyIdHandler = (movieId) => {

    // showAreYouSureModal();
    areYouSureModal.classList.add('visible');
    toggleBackdrop();
    let deleteMovieButton = areYouSureModal.querySelector('.btn--danger');
    deleteMovieButton.replaceWith(deleteMovieButton.cloneNode(true));
    deleteMovieButton = areYouSureModal.querySelector('.btn--danger');
    const cancelMovieDeletionButton = areYouSureModal.querySelector('.btn--passive');
    cancelMovieDeletionButton.removeEventListener('click',cancelMovieDeletion);
    cancelMovieDeletionButton.addEventListener('click',cancelMovieDeletion);
    // why bind is used here? 
    // because we want to pass the movieId to the deleteMoviebyId function
    deleteMovieButton.addEventListener('click',deleteMoviebyId.bind(null,movieId));

};

const deleteMoviebyId = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    if (movieIndex >= 0) {
        movies.splice(movieIndex,1);
    }
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    cancelMovieDeletion();
    updateUI();

};


const renderNewMovieElement = (id,title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div> 
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    const listRoot = document.getElementById('movie-list');
    const deleteMovieButton = document.createElement('button');
    deleteMovieButton.textContent = 'Delete';
    deleteMovieButton.className = 'btn';
    deleteMovieButton.addEventListener('click',deleteMoviebyIdHandler.bind(null,id));
    newMovieElement.append(deleteMovieButton);
    listRoot.append(newMovieElement);


};

const clearUserInputs = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const addAddMovieButtonHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5) {
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }

    if(!validateUrl(imageUrlValue)){
        alert('Please enter valid url.');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    clearUserInputs();
    console.log(movies);
    renderNewMovieElement(newMovie.id,newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
    CloseMovieModal();
    // toggleBackdrop();

};

const CloseMovieModal = () => {
    addMovieModal.classList.remove('visible');
    toggleBackdrop();
};

const ShowMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const cancelAddMovie = () => {
    CloseMovieModal();
    clearUserInputs();
    toggleBackdrop();
};

const validateUrl = (url) => {
    try{
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};


const backdropClickHandler = () => {
    
    cancelMovieDeletion();
    CloseMovieModal();
    toggleBackdrop();
};

const cancelMovieDeletion = () => {
    
    areYouSureModal.classList.remove('visible');
    toggleBackdrop();
    
};



startAddMovieButton.addEventListener('click', ShowMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
addAddMovieButton.addEventListener('click', addAddMovieButtonHandler);
console.log(movies);
