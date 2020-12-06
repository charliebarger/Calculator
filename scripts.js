const numberButtons = document.querySelectorAll(".numberButton");
const display = document.querySelector(".display");
const onDisplay = document.createElement('span');
onDisplay.textContent = 0;
display.appendChild(onDisplay);                             
const operatorButtons = document.querySelectorAll(".operator");
let equalSign = document.querySelector('.equal');
const clearButtons = document.querySelector(".clear");
const changeSign = document.querySelector('.sign-change');
const decimal = document.querySelector('.decimal');

let value = 0;
let displayValue = onDisplay.textContent;
let firstNum;
let secondNum;
let firstSecond = 'first';
let count = 0;
let first;
let second;
let operatorSelection;
let answer;
let equalSwitch;
let opSwitch = false;
let decimalSwitch = true;


//functions


function add(item1, item2){
    return(item1 + item2);
}

function subtract(item1, item2){
    return(item1 - item2);
}

function multiply(item1, item2){
    return(item1 * item2);
}

function divide(item1, item2){
    let result = item2 == 0 ? 'Error': item1 / item2;
    return(result);
    }

function modulus(item1, item2){
   let result = item2 == 0 ? 'Error': item1 % item2;
    return(result);
}

function operate(operator, item1, item2 = 0){
    let choice;
    switch(operator) {
        case '+':
            choice = add;
            break;
        case '-':
            choice = subtract;
            break;
        case 'x' :
            choice = multiply;
            break;
        case '*' :
            choice = multiply;
            break;
        case '÷':
            choice = divide;
            break;
        case '/':
            choice = divide;
            break;
        case '%':
            choice = modulus;
            break;
        }
    return(choice(item1, item2));
}

//clears display if the variable count == 0, if it is not it does nothing
function clearDisplay(){
    if (count == 0){
        onDisplay.textContent = "";
        count++;
    }
}

// call clear display to check if the screen needs to be cleared and then add and append the new number before returning it
function displayScreen(button){
    clearDisplay();
    onDisplay.textContent += button;
    display.appendChild(onDisplay);
    return(Number(onDisplay.textContent))
}

//clears display, operator type, and puts count to 0
function resetVariables(){
    onDisplay.textContent = 0;
    count = 0;
    firstSecond = 'first';
    equalSwitch = false;
    first = false;
    second = false;
    decimalSwitch = true;
}

//assigns positions to first or second based on firstSecond and if equalSwitch
function assignPosition(button){
    if (equalSwitch == true){
        resetVariables();
    }
    if (firstSecond == 'first'){
        first = displayScreen(button);
    }
    else{
        second = displayScreen(button);
        opSwitch = true;
    }
}

function RoundNumber(number){
    answer = Math.round((number + Number.EPSILON) * 100) / 100;
}

function equals(){
    if (first && operatorSelection){
        first == 'Error' ? answer = 'Error' : answer = operate(operatorSelection, first, second);
        if (answer != 'Error'){RoundNumber(answer)};
        first = answer;
        onDisplay.textContent = answer;
        equalSwitch = true;
        opSwitch = false;
        decimalSwitch = true;
    }
}

function selectOperator(button){
    decimalSwitch = true;
    firstSecond = 'second';
    count = 0;
    //when first and second have been assigned values and opswitch is true call equals() 
    if (first && second && opSwitch ){
        equals()
    }
    equalSwitch = false;
    operatorSelection = button;
}


//event listners


//equal switch is true after the equals() function has been called, if a number button is pressed while equal switch is on, call resetVariables to have a clean workspace. if firstSecond is equal to 'first' the variable first is assigned else the second is
numberButtons.forEach((button) => { button.addEventListener('click', () => {
    assignPosition(button.textContent);
})})

//make it so only one decimal can be used per entry
decimal.addEventListener('click', () => {
    if (decimalSwitch == true){
        assignPosition(decimal.textContent);
    }
    decimalSwitch = false;
})

//each time an operator is pressed reset decimalSwitch and count, change firstSecond to second 

operatorButtons.forEach((button) => { button.addEventListener('click', () => {
    selectOperator(button.textContent);
})})

equalSign.addEventListener('click', () => {
    equals()
})

clearButtons.addEventListener('click', () => {
     resetVariables()
})

//change positive and negative signs
changeSign.addEventListener('click', () => {
    onDisplay.textContent = Number(onDisplay.textContent) * -1;
    !opSwitch ? first = Number(onDisplay.textContent) : second = Number(onDisplay.textContent)
})

document.onkeypress = function(e){
    e.preventDefault()
    if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57){
        assignPosition(e.key)
    }
    if (e.key.charCodeAt(0) == 120 || e.key.charCodeAt(0) == 42 || e.key.charCodeAt(0) == 45 ||e.key.charCodeAt(0) == 43 || e.key.charCodeAt(0) == 47 ){
        selectOperator(e.key)
    }
    if(e.key == 'Enter'){
        equals()
    }
    if(e.key == 'c' || e.key == 'C'){
        resetVariables()
    }
}
