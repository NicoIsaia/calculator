function add(a, b) {
    return a + b;
};

function substract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0) return "error";
    return a/b;
};

function operate(a, b, op) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "incorrect operator";
    }
};

// Variable to store operand
let oper = "";
// Variable to store first number (or result of previous operation)
let firstNum = "";
// Variable to store number being displayed
let displayVar = "";

const numbers = document.querySelectorAll("button.number");
let display = document.querySelector("#display-value");


function numbLogger(event) {
    let num = event.target;
    if (displayVar) {
        if (displayVar.length < 15) {
            if (num.textContent === "." && displayVar.includes(".")) {
                // do nothing
            } else {
                displayVar += num.textContent;
                //displayVar = toString(parseInt(displayVar)) // QUEDASTE ACÁ
                /* Evitando ceros a la izquierda. La idea es convertir a int y
                después volver a string, pero por algún motivo si ponés dos
                ceros da NaN. Me tengo que ir.*/
                display.textContent = parseInt(displayVar);
            }
        }
    } else {
        displayVar += num.textContent;
        display.textContent = parseInt(displayVar);
    }
}

function keyLogger(event) {
    let num = event.key;
    const allowedNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."] 
    if (allowedNums.includes(num)) {
        if (displayVar.length < 15) {
            if (num === "." && displayVar.includes(".")) {
                // do nothing
            } else {
                displayVar += num;
                display.textContent = parseInt(displayVar);
            }
        }
    }
    if (num === "c" || num === "C") {
        clearMem();
    }

    if (num === "Backspace") backspace();

    const symbols = ["+", "-", "*", "/", "Enter"]
    if (symbols.includes(num)) {
        if (num === "Enter") {
            if (oper) {
                if (!displayVar && !firstNum) displayVar = 0;
                if (!displayVar) displayVar = firstNum;
                if (!firstNum) firstNum = 0;
                if (!oper) oper = "+";
                displayVar = operate(parseFloat(firstNum), parseFloat(displayVar), oper);
                if (displayVar === "error") {
                    display.textContent = "Destroying universe";
                } else {
                    display.textContent = Math.round((displayVar + Number.EPSILON) * 100) / 100;
                }
                firstNum = "";
            }
        } else {
            operationWithKeys(num);
        }
    }
}

function clearMem() {
    firstNum = "";
    displayVar = "";
    display.textContent = "0";
}

function operation(event) {
    if (!firstNum) {
        if (!displayVar) displayVar = 0;
        firstNum = displayVar;
        oper = event.target.textContent;
        displayVar = "";
    } else {
        if (!displayVar && !firstNum) displayVar = 0;
        if (!displayVar) displayVar = firstNum;
        displayVar = operate(parseFloat(firstNum), parseFloat(displayVar), oper);
        oper = event.target.textContent;
        if (displayVar === "error") {
            display.textContent = "deleting universe";
        } else {
            display.textContent = Math.round((displayVar + Number.EPSILON) * 100) / 100;
        }
        firstNum = displayVar;
        displayVar = "";
    }
}

function backspace() {
    if (displayVar.length > 1) {
        displayVar = displayVar.slice(0, -1);
        display.textContent = displayVar;
    } else {
        displayVar = "";
        display.textContent = "0";
    }
}

function operationWithKeys(key) {
    if (!firstNum) {
        if (!displayVar) displayVar = 0;
        firstNum = displayVar;
        oper = key;
        displayVar = "";
    } else {
        if (!displayVar && !firstNum) displayVar = 0;
        if (!displayVar) displayVar = 0;
        displayVar = operate(parseFloat(firstNum), parseFloat(displayVar), oper);
        oper = key;
        if (displayVar === "error") {
            display.textContent = "deleting universe";
        } else {
            display.textContent = Math.round((displayVar + Number.EPSILON) * 100) / 100;
        }
        firstNum = displayVar;
        displayVar = "";
    }
}

document.addEventListener("keydown", keyLogger);

numbers.forEach((number) => number.addEventListener("click", numbLogger));
//numbers.forEach((number) => number.addEventListener("touchstart", numbLogger));

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearMem);

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const multiplicate = document.querySelector('.multiplicate');
const divi = document.querySelector('.divide');
const back = document.querySelector('.back');

plus.addEventListener('click', operation);
minus.addEventListener('click', operation);
multiplicate.addEventListener('click', operation);
divi.addEventListener('click', operation);
back.addEventListener('click', backspace)

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if (oper) {
        if (!firstNum) firstNum = 0;
        if (!displayVar) displayVar = firstNum;
        if (!oper) oper = "+";
        displayVar = operate(parseFloat(firstNum), parseFloat(displayVar), oper);
        if (displayVar === "error") {
            display.textContent = "deleting universe";
        } else {
            display.textContent = Math.round((displayVar + Number.EPSILON) * 100) / 100;
        }
        firstNum = "";
    } 
});