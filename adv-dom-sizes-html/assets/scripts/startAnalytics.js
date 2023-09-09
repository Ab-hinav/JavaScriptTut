console.log('fdsa');

const id = setInterval(()=>{
    console.log('helloe from analytics')
},2000);

document.getElementById('stop-analytics-interval').addEventListener('click',()=>{
    clearInterval(id);
});