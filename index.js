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
let hitsEquals = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", function () {
    if (number.textContent === "." && !hasDecimal) {
      hasDecimal = true;
    } else if (number.textContent === "." && hasDecimal) {
      return;
    }

    if (hitsEquals) return;

    display2Num += number.textContent;
    display2.textContent = display2Num;
  });
});

operatorButtons.forEach((operation) => {
  operation.addEventListener("click", function () {
    if (!display2Num || display2Num === ".") return;
    hasDecimal = false;

    const operationName = operation.value;

    if (display1Num && display2Num && lastOperation) {
      operate();
    } else {
      result = parseFloat(display2Num);
    }

    displayHistory(operationName);
    lastOperation = operationName;
    hitsEquals = false;
  });
});

equalsButton.addEventListener("click", function () {
  if (!display1Num || !display2Num || display2Num === ".") return;
  hasDecimal = false;
  hitsEquals = true;
  operate();
  displayHistory();
  display2.textContent = result;
  display2Num = result;
  display1Num = "";

  if (display2Num === 0) {
    display2Num = "0";
  }
});

resetButton.addEventListener("click", function () {
  hasDecimal = false;
  hitsEquals = false;
  display1.textContent = "";
  display2.textContent = "";
  display1Num = "";
  display2Num = "";
  result = "";
});

backspaceButton.addEventListener("click", function () {
  if (hitsEquals) return;
  display2.textContent = display2.textContent.substring(0, display2.textContent.length - 1);
  display2Num = display2Num.substring(0, display2Num.length - 1);

  if (!display2Num.includes(".")) {
    hasDecimal = false;
  }
});

window.addEventListener("keydown", function (e) {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0" ||
    e.key === "." ||
    e.key === "-" ||
    e.key === "+" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "=" ||
    e.key === "%" ||
    e.key === "Backspace" ||
    e.key === "Escape" ||
    e.key === "Enter"
  ) {
    clickButton(e.key);
  }
});

function operate() {
  num1 = parseFloat(result);
  num2 = parseFloat(display2Num);

  if (lastOperation === "+") {
    result = Math.round((num1 + num2) * 100) / 100;
    return result;
  }

  if (lastOperation === "-") {
    result = Math.round((num1 - num2) * 100) / 100;
    return result;
  }

  if (lastOperation === "*") {
    result = Math.round(num1 * num2 * 100) / 100;
    return result;
  }

  if (lastOperation === "/") {
    result = Math.round((num1 / num2) * 100) / 100;
    return result;
  }

  if (lastOperation === "%") {
    result = Math.round((num1 % num2) * 100) / 100;
    return result;
  }
}

function displayHistory(name = "") {
  display1Num += display2Num + " " + name + " ";
  display1.textContent = display1Num;
  display2.textContent = "";
  display2Num = "";
}

function clickButton(key) {
  numberButtons.forEach((number) => {
    if (number.textContent === key) {
      number.click();
    }
  });

  operatorButtons.forEach((operation) => {
    if (operation.value === key) {
      operation.click();
    }
  });

  if (key === "Backspace") {
    backspaceButton.click();
  }

  if (key === "Enter" || key === "=") {
    equalsButton.click();
  }

  if (key === "Escape") {
    resetButton.click();
  }
}
