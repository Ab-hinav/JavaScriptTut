const button = document.querySelector('button');
const output = document.querySelector('p');

function setTimer(duration){

  const promise = new Promise((resolve ,reject) => {
    setTimeout(()=>{
      resolve('done');
    },duration);
  });

  return promise;
}

function getPosition(){

  const promise = new Promise((resolve,reject) => {
    navigator.geolocation.getCurrentPosition((posData) =>{
      resolve(posData);
    },
    error =>{
      reject(err);
      console.log('error getting pos data')}
    );
  })

  return promise;
}


function trackUserHandler() {
  getPosition().then((posData)=>{
    console.log(posData);
    return setTimer(2000);
  }).catch((err)=>{
    console.log(err);
  }).then(()=>{
    console.log('tasks completed');
  })
  setTimeout(()=> console.log('print me'),0);
  console.log('getting location');
}

button.addEventListener('click', trackUserHandler);

async function trackUserHandler2(){

  let posData;
  let timerData;

  try {
     posData = await getPosition();
     timerData = await setTimer(2000);

  }catch(error){

    console.log(error);

  }
  console.log('runs only after await');

}






// let res  =0;
// for (let i =0;i<100000;i++){
//   res +=i;
// }

// console.log(res);


// understanding event loop


// Promise States & "finally"
// You learned about the different promise states:

// PENDING => Promise is doing work, neither then() nor catch() executes at this moment

// RESOLVED => Promise is resolved => then() executes

// REJECTED  => Promise was rejected => catch() executes

// When you have another then() block after a catch() or then() block, the promise re-enters PENDING mode (keep in mind: then() and catch() always return a new promise - either not resolving to anything or resolving to what you return inside of then()). Only if there are no more then() blocks left, it enters a new, final mode: SETTLED.

// Once SETTLED, you can use a special block - finally() - to do final cleanup work. finally() is reached no matter if you resolved or rejected before.

// Here's an example:

somePromiseCreatingCode()
    .then(firstResult => {
        return 'done with first promise';
    })
    .catch(err => {
        // would handle any errors thrown before
        // implicitly returns a new promise - just like then()
    })
    .finally(() => {
        // the promise is settled now - finally() will NOT return a new promise!
        // you can do final cleanup work here
    });
// You don't have to add a finally() block (indeed we haven't in the lectures).



