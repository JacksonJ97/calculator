const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const resetButton = document.querySelector("[data-reset]");
const backspaceButton = document.querySelector("[data-backspace]");
const equalsButton = document.querySelector("[data-equals]");
const display1 = document.querySelector("#display-1");
const display2 = document.querySelector("#display-2");

let display1Num = "";
let display2Num = "";
let result = null;
let lastOperation = "";
let hasDecimal = false;
let hitEquals = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", function () {
    if (number.textContent === "." && !hasDecimal) {
      hasDecimal = true;
    } else if (number.textContent === "." && hasDecimal) {
      return;
    }

    display2Num += number.textContent;
    display2.textContent = display2Num;
  });
});

operatorButtons.forEach((operation) => {
  operation.addEventListener("click", function () {
    if (!display2Num) return;
    hasDecimal = false;

    const operationName = operation.value;

    if (display1Num && display2Num && lastOperation) {
      operate();
    } else {
      result = parseFloat(display2Num);
    }

    displayHistory(operationName);
    lastOperation = operationName;
  });
});

equalsButton.addEventListener("click", function () {
  if (!display1Num || !display2Num) return;
  hasDecimal = false;
  operate();
  displayHistory();
  display2.textContent = result;
  display2Num = result;
  display1Num = "";
});

resetButton.addEventListener("click", function () {
  display1.textContent = "";
  display2.textContent = "";
  display1Num = "";
  display2Num = "";
  result = "";
});

backspaceButton.addEventListener("click", function () {
  display2.textContent = display2.textContent.substring(0, display2.textContent.length - 1);
  display2Num = display2Num.substring(0, display2Num.length - 1);
});

function operate() {
  num1 = parseFloat(result);
  num2 = parseFloat(display2Num);

  if (lastOperation === "+") {
    result = num1 + num2;
    return result;
  }

  if (lastOperation === "-") {
    result = num1 - num2;
    return result;
  }

  if (lastOperation === "*") {
    result = num1 * num2;
    return result;
  }

  if (lastOperation === "/") {
    result = num1 / num2;
    return result;
  }

  if (lastOperation === "%") {
    result = num1 % num2;
    return result;
  }
}

function displayHistory(name = "") {
  display1Num += display2Num + " " + name + " ";
  display1.textContent = display1Num;
  display2.textContent = "";
  display2Num = "";
}
