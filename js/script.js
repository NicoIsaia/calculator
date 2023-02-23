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

