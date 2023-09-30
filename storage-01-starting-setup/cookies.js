console.log(document.cookie);


const storeBtn = document.getElementById('store-btn');
const getBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click',() => {
    const userID = 'u23'
    const user = {
        name: 'abhi',
        age:43
    };
    document.cookie = `user=${JSON.stringify(user)}`;
    document.cookie = `uid=${userID}`;
});

getBtn.addEventListener('click',() => {
    alert(document.cookie);
    const cData = document.cookie.split(';');
    console.log(cData);
    const data = cData.map(i => i.trim());
    console.log(data[1].split('=')[1]);
})


// can set max-age=324 -> secs