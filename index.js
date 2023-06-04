const numberButton = document.querySelectorAll(".numberButton");
const actionButton = document.querySelectorAll(".actionButton");
const operationButton = document.querySelectorAll(".operationButton");
const display = document.getElementById("display");

function add(a, b) {
  console.log(a + b);
}

function subtract(a, b) {
  console.log(a - b);
}

function multiply(a, b) {
  console.log(a * b);
}

function divide(a, b) {
  console.log(a / b);
}

let firstNumber = 0,
  secondNumber = 0,
  operation = "/";

function operate(firstNumber, secondNumber, operation) {
  switch (operation) {
    case "+":
      add(firstNumber, secondNumber);
      break;
    case "-":
      subtract(firstNumber, secondNumber);
      break;
    case "*":
      multiply(firstNumber, secondNumber);
      break;
    case "/":
      divide(firstNumber, secondNumber);
      break;
  }
}

numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    changeDisplay(number.textContent);
    if (firstNumber === 0) firstNumber = number.textContent;
    else secondNumber = number.textContent;
  });
});
operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    console.log("operation changed");
    operation = operation.textContent;
    console.log(operation);
    console.log(typeof operation);
  });
});
function changeDisplay(number) {
  display.textContent = number;
}
