const numberButtons = document.querySelectorAll(".numberButton");
const display = document.querySelector(".display");
const onDisplay = document.createElement('span')
onDisplay.textContent = 0;

display.appendChild(onDisplay)
const operatorButtons = document.querySelectorAll(".operator")
let value = 0;
let displayValue = onDisplay.textContent;
let firstNum;
let secondNum;
let firstSecond = 'first';
let count = 0;
let first;
let second;
let operatorSelection;
let equalSign = document.querySelector('.equal')
let answer;
const clearButtons = document.querySelector(".clear")
const changeSign = document.querySelector('.sign-change')
let equalSwitch;

function add(item1, item2){
    return(item1 + item2)
}
function subtract(item1, item2){
    return(item1 - item2)
}
function multiply(item1, item2){
    return(item1 * item2)
}
function divide(item1, item2){
    let bar = item2 == 0 ? 'Error': item1 / item2;
    return(bar)
    
}
function modulus(item1, item2){
    return(item1 % item2);
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
        case 'x':
            choice = multiply;
            break;
        case '÷':
            choice = divide;
            break;
        case '%':
            choice = modulus;
            break;
        }
    return(choice(item1, item2))
}

//clears display if the variable count == 0, if it is not it does nothing

function clearDisplay(){
    if (count == 0){
        onDisplay.textContent = "";
        count++
    }
}

// call clear display to check if the screen needs to be cleared and then add and append the new number before returning it

function displayScreen(button){
    clearDisplay()
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
}

//equal switch is true after the equals() function has been called, if a number button is pressed while equal switch is on, call resetVariables to have a clean workspace. if firstSecond is equal to 'first' the variable first is assigned else the second is

numberButtons.forEach((button) => { button.addEventListener('click', () => { 
    if (equalSwitch == true){
        resetVariables()
    }

    if (firstSecond == 'first'){
        first = displayScreen(button.textContent)
    }
    else{
    second = displayScreen(button.textContent);
    opSwitch = true
    }
})})

let opSwitch = false;
function equals(){
    answer = operate(operatorSelection, first, second);
    first = answer;
    onDisplay.textContent = answer;
    equalSwitch = true;
    firstSecond = 'second'
    opSwitch = false;
}


operatorButtons.forEach((button) => { button.addEventListener('click', () => {
    firstSecond = 'second';
    count = 0;
    if (first && second && opSwitch == true){
        equals();
    }
    equalSwitch = false;
    operatorSelection = button.textContent;
    }
)});


 equalSign.addEventListener('click', () => {
     equals()
 })

 clearButtons.addEventListener('click', () => {
     resetVariables()
 })



changeSign.addEventListener('click', () =>
{
    onDisplay.textContent = Number(onDisplay.textContent) * -1
    if (firstSecond == 'first'){
        console.log('yipp')
        first = Number(onDisplay.textContent)
        console.log(first)
        }
    else{
        console.log('2nd')
        second = Number(onDisplay.textContent)
    }
})

