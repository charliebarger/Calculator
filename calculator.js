
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
    return(item1 / item2)
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
let onOff = false;
let count = 0;
let first;
let second;
let operatorSelection;
let equalSign = document.querySelector('.equal')
let answer;
const clearButtons = document.querySelector(".clear")
const changeSign = document.querySelector('.sign-change')


//functions

//shows numbers on screen and returns that number

function clearDisplay(){
    if (count == 0){
        onDisplay.textContent = "";
        count++
    }
}

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
    onOff = false;
    equalSwitch = false;
    first = false;
    second = false;
}

let firstSecond;
numberButtons.forEach((button) => { button.addEventListener('click', () => { 
    if (equalSwitch == true){
        resetVariables()
    }
    if (!onOff){
        firstSecond = 'first'
        first = displayScreen(button.textContent)
    }
    else{
       firstSecond = 'second'
       second = displayScreen(button.textContent)
    }
    
})})

function equals(){
    answer = operate(operatorSelection, first, second);
    first = answer;
    onDisplay.textContent = answer;
    equalSwitch = true;
    firstSecond = 'first'
}


operatorButtons.forEach((button) => { button.addEventListener('click', () => {
    onOff = true;
    count = 0;
    if (equalSwitch == true){
        equalSwitch = false;
        second = false;
    }
    if (first && second){
        equals();
        second = false;
    }
    operatorSelection = button.textContent;
    }
)});

let equalSwitch
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