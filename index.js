function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === plus) {
    result = add(num1, num2);
    return result;
  }

  if (operator === minus) {
    result = subtract(num1, num2);
    return result;
  }

  if (operator === multiply) {
    result = multiply(num1, num2);
    return result;
  }

  if (operator === divide) {
    result = divide(num1, num2);
    return result;
  }
}

// const num1 = 5;
// const num2 = 5;
// console.log(operate(minus, num1, num2));

const buttons = document.querySelectorAll("button");
buttons.forEach((input) => {
  input.addEventListener("click", function (e) {
    console.log(e.target.value);
    const displayValue = document.querySelector("#user-input");
    displayValue.textContent = e.target.value;
    console.log(displayValue);
  });
});
