
const templ = document.getElementById("single-post");
const ul = document.querySelector(".posts");
const availablePostsBtn = document.querySelector('#available-posts button');

availablePostsBtn.addEventListener('click',() => {

sendHttpRequest('GET','https://jsonplaceholder.typicode.com/pos')
.then(responseData => {
    for (const post of responseData) {
        const postel =  templ.content.cloneNode(true);
        // console.log(postel);
            postel.querySelector('h2').textContent = post.title;
            postel.querySelector('p').textContent = post.body;
            postel.querySelector('li').setAttribute('id',post.id);
            // console.log(list);
            ul.appendChild(postel);
        
    }
})
.catch(err => {console.log(err)});
})


function sendHttpRequest(method,url,data){

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (method === 'POST' || method === 'PUT' || method === 'post' || method === 'put') {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }

    if (method === 'GET'){
        xhr.responseType = 'json';
    }
    if (!!data){
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    let promise = new Promise((resolve,reject) => {

        xhr.onload = () => {
            if (xhr.status >= 300) {
                console.log('server error');
                reject('some server issue occured');
            }
            resolve(xhr.response);
        }

        xhr.onerror = () => {
            reject('some network error occured');
        }    


    });
    
    return promise;
}




function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createPost(title,content){
    const userId = getRandomNumber(0,100);
    const post ={
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',post);
}

const btn = document.querySelector('#new-post button');

// btn.addEventListener('click',collectAndSendPost);


// function collectAndSendPost(e){
//     e.preventDefault();
//     const titleData = document.querySelector('.form-control #title').value;
//     const postData = document.querySelector('.form-control #content').value;

//     createPost(titleData,postData);
// }



// use the form

const form = document.querySelector('#new-post form');


form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;
    createPost(enteredTitle,enteredContent);
})


ul.addEventListener('click',event => {
    if (event.target.tagName === 'BUTTON') {
        const li = event.target.closest('li');
        const id = li.id;
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${id}`);
        ul.removeChild(li);
    }
})



