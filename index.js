const numberButton = document.querySelectorAll(".numberButton");
const actionButton = document.querySelectorAll(".actionButton");
const operationButton = document.querySelectorAll(".operationButton");
const display = document.getElementById("display");
const equalButton = document.querySelector(".equalButton");
let operated = false;

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

let firstNumber = 0,
  secondNumber = 0,
  result = 0,
  operateSign = "";

function operate(firstNumber, secondNumber, operation) {
  switch (operation) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = subtract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divide(firstNumber, secondNumber);
      break;
  }
}

numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    changeDisplay(number.textContent);
    if (
      (result === 0 && operateSign === "") ||
      firstNumber === 0 ||
      operated === true
    ) {
      firstNumber = number.textContent;
      operated = false;
    } else secondNumber = number.textContent;
  });
});
operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    operateSign = operation.textContent;
    operated = false;
    result = 0;
  });
});
function changeDisplay(number) {
  display.textContent = number;
}

equalButton.addEventListener("click", () => {
  if (operateSign !== "" && secondNumber !== 0) {
    if (firstNumber === 0) {
      operate(result, secondNumber, operateSign);
    } else {
      operate(firstNumber, secondNumber, operateSign);
    }
    changeDisplay(result);
    operated = true;
    firstNumber = result;
    secondNumber = 0;
    operateSign = "";
  }
});
