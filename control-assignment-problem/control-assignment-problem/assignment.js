const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

if (randomNumber > 0.7) {
  alert('Greater than 0.7');
}

const arr = [5, 8, 11, 15, 17];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);

}

for (const num of arr){
    console.log(num);
}