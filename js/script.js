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

let displayVar = "";

const numbers = document.querySelectorAll("button.number");
let display = document.querySelector("#display-value");

function numbLogger(event) {
    let num = event.target;
    if (displayVar.length < 15) {
        if (num.textContent === "." && displayVar.includes(".")) {
            // do nothing
        } else {
            displayVar += num.textContent;
            display.textContent = displayVar;
        }
    }
}

function keyLogger(event) {
    let num = event.key;
    if (displayVar.length < 15) {
        if (num === "." && displayVar.includes(".")) {
            // do nothing
        } else {
            displayVar += num;
            display.textContent = displayVar;
        }
    }
}

document.addEventListener("keydown", keyLogger);

numbers.forEach((number) => number.addEventListener("click", numbLogger));
numbers.forEach((number) => number.addEventListener("touchstart", numbLogger));

