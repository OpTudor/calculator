const numberButton = document.querySelectorAll(".numberButton");
const actionButton = document.querySelectorAll(".actionButton");
const operationButton = document.querySelectorAll(".operationButton");
const display = document.getElementById("display");
const equalButton = document.querySelector(".equalButton");
let operated = false;

function add(a, b) {
  changeDisplay(Number(a) + Number(b));
}

function subtract(a, b) {
  changeDisplay(Number(a) - Number(b));
}

function multiply(a, b) {
  changeDisplay(Number(a) * Number(b));
}

function divide(a, b) {
  changeDisplay(Number(a) / Number(b));
}

let firstNumber = 0,
  secondNumber = 0,
  operateSign = "";

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
    if (firstNumber === 0 || operated === true) {
      firstNumber = number.textContent;
      operated = false;
    } else secondNumber = number.textContent;
  });
});
operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    operateSign = operation.textContent;
    operated = false;
  });
});
function changeDisplay(number) {
  display.textContent = number;
  firstNumber = number;
}

equalButton.addEventListener("click", () => {
  operate(firstNumber, secondNumber, operateSign);
  operated = true;
});
