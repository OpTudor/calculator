const numberButton = document.querySelectorAll(".numberButton");
const clearButton = document.querySelector(".clearButton");
const operationButton = document.querySelectorAll(".operationButton");
const display = document.getElementById("display");
const equalButton = document.querySelector(".equalButton");
const signButton = document.querySelector(".signButton");
const decimalButton = document.querySelector(".decimalButton");
let operated = false;
display.textContent = 0;

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
    if (operateSign === "") {
      firstNumber = Number(display.textContent);
    } else {
      secondNumber = Number(display.textContent);
    }
  });
});

operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    operateSign = operation.textContent;
    operated = false;
    result = 0;
    display.textContent = "";
  });
});

function changeDisplay(number) {
  if (
    (number === "." && display.textContent.includes(".")) ||
    display.textContent.length > 7
  ) {
    return;
  }

  if (
    (display.textContent === "0" && number !== ".") ||
    display.textContent === "NaN"
  ) {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

equalButton.addEventListener("click", () => {
  if (secondNumber === 0 && (operateSign === "/" || operateSign === "*")) {
    changeDisplay("NaN");
    operated = true;
    firstNumber = result;
    secondNumber = 0;
    operateSign = "";
  } else if (operateSign !== "") {
    if (firstNumber === 0) {
      operate(result, secondNumber, operateSign);
    } else {
      operate(firstNumber, secondNumber, operateSign);
    }
    display.textContent = "";
    changeDisplay(result);
    operated = true;
    firstNumber = result;
    secondNumber = 0;
    operateSign = "";
  }
});

clearButton.addEventListener("click", () => {
  display.textContent = 0;
  firstNumber = 0;
  secondNumber = 0;
  operateSign = "";
});

signButton.addEventListener("click", () => {
  if (display.textContent === firstNumber) {
    firstNumber = 0 - firstNumber;
    changeDisplay(firstNumber);
  } else {
    secondNumber = 0 - secondNumber;
    changeDisplay(secondNumber);
  }
});

decimalButton.addEventListener("click", () => {
  if (operateSign === "" && !String(firstNumber).includes(".")) {
    firstNumber = String(firstNumber) + ".";
    display.textContent = "";
    changeDisplay(firstNumber);
  } else if (operateSign !== "" && !String(secondNumber).includes(".")) {
    secondNumber = String(secondNumber) + ".";
    display.textContent = "";
    changeDisplay(secondNumber);
  }
});
