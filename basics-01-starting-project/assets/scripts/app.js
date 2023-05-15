const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];
// currentResult = currentResult + 10*3;
let initialResult = currentResult;

function getUserNumberInput() {
    return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    // `` backticks used for template literals
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(operatioIdentifier, prevResult,
    operationNumber, newResult) {

    const logEntry = {
        operation: operatioIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}


function calculate(operation) {

    const getEnteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    let mathOperator;
    if (operation === 'ADD') {
        currentResult += getEnteredNumber;
        mathOperator = '+';
    }else if (operation === 'SUBTRACT') {
        currentResult -= getEnteredNumber;
        mathOperator = '-';
    }else if (operation === 'MULTIPLY') {
        currentResult *= getEnteredNumber;
        mathOperator = '*';
    }else if (operation === 'DIVIDE') {
        currentResult /= getEnteredNumber;
        mathOperator = '/';
    }
    createAndWriteOutput(mathOperator, initialResult, getEnteredNumber);
    writeToLog(operation, initialResult, getEnteredNumber, currentResult);        

}

// use bind to pass arguments to event listener function
// bind keyword allows us to preconfigure the function
addBtn.addEventListener('click', calculate.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculate.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calculate.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click', calculate.bind(this, 'DIVIDE'));





