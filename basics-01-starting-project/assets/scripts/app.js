const defaultResult = 0;
let currentResult = defaultResult;

// currentResult = currentResult + 10*3;


function add() {
    currentResult = currentResult + parseInt(userInput.value) ;
    // can use + instead of parseInt
    // alert('The result is ' + result);
    outputResult(currentResult, '');
}
addBtn.addEventListener('click', add);






