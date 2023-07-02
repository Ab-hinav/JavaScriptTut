const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('.posts');


function renderPosts(data) {

    const parentElement = document.querySelector(".posts");
    const template = document.getElementById('single-post');
    console.log(template);

    for ( const dat of data){
        
        const templateClone = document.importNode(template.content , true);
        templateClone.querySelector('h2').textContent = dat.title.toUpperCase();
        templateClone.querySelector('p').textContent = dat.body;
        templateClone.querySelector('li').id = dat.id;
        console.log(templateClone);
        parentElement.append(templateClone);

    }
}

function sendXhrRequest(method,url,data){
    // let promise = new Promise((resolve,reject) => {
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';
    // xhr.open(method,url);
    // xhr.onload = function () {
       
    // if (xhr.status>=200 && xhr.status<300)    
    //     resolve(xhr.response);
    // else 
    //     reject(new Error('Something went wrong'));

    // }

    // xhr.onerror = function() {
    //     reject(new Error('Failed to send request'));
    // }


    // xhr.send(JSON.stringify(data));
    // });

    // return promise;
    return fetch(url,{
        method:method,
        // body:data,
        body:JSON.stringify(data),
        // headers: {
        //     'Content-type':'application/json'
        // }
    }).then((responseData) => {
            if (responseData.status >=200 && responseData.status<300){
                return responseData.json();
            }else {
                return responseData.json().then(error => {
                    console.log(error);
                    throw new Error("something went wrong");
                })
            }
    }).catch(err => {
        console.log('triigerd only when there is a network failure');
        console.log(err);
        throw new Error('wtf');
    })
}

fetchButton.addEventListener('click',getRequest);
form.addEventListener('submit',event => {
    event.preventDefault();
    const title = event.currentTarget.querySelector('#title').value;
    const body = event.currentTarget.querySelector('#content').value;

    createPost(title,body);
})




// sendXhrRequest('GET','https://jsonplaceholder.typicode.com/posts').then(responseData => {renderPosts(responseData)});


async function getRequest(){

    try{
    let data = await sendXhrRequest('GET','https://jsonplaceholder.typicode.com/post');
    renderPosts(data);
    } catch(error){
        alert(error.message);
    }
}

async function createPost(title ,body){

    const post ={
        title :title,
        body: body,
        userId: Math.floor(Math.random(100)),
    };
    // const fd = new FormData(form);
    // sendXhrRequest('POST','https://jsonplaceholder.typicode.com/posts',fd);

    sendXhrRequest('POST','https://jsonplaceholder.typicode.com/posts',post);
}

postList.addEventListener('click',event => {
    if (event.target.tagName == 'BUTTON') {
        console.log('clicked');
        const postId = event.target.closest('li').id;
        sendXhrRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
})











