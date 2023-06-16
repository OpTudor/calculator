const numberButton = document.querySelectorAll(".numberButton");
const clearButton = document.querySelector(".clearButton");
const operationButton = document.querySelectorAll(".operationButton");
const display = document.getElementById("display");
const equalButton = document.querySelector(".equalButton");
const signButton = document.querySelector(".signButton");
const decimalButton = document.querySelector(".decimalButton");
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

function percentage(a, b) {
  return (Number(a) / 100) * Number(b);
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
    case "%":
      result = percentage(firstNumber, secondNumber);
      break;
  }
}

numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    if (operateSign === "") {
      changeDisplay(number.textContent);
      firstNumber = Number(display.textContent);
    } else {
      if (secondNumber === 0) clearDisplay();
      changeDisplay(number.textContent);
      secondNumber = Number(display.textContent);
    }
  });
});

operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    operateSign = operation.textContent;
    result = 0;
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
    display.textContent === "NaN" ||
    display.textContent === "Infinity" // still cant type after infinity
  ) {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

equalButton.addEventListener("click", () => {
  if (operateSign !== "") {
    if (firstNumber === 0) {
      operate(result, secondNumber, operateSign);
    } else {
      operate(firstNumber, secondNumber, operateSign);
    }
    clearDisplay();
    changeDisplay(result);
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

function clearDisplay() {
  display.textContent = "";
}

signButton.addEventListener("click", () => {
  if (operateSign === "" && display.textContent === String(firstNumber)) {
    firstNumber = 0 - firstNumber;
    clearDisplay();
    changeDisplay(firstNumber);
  } else if (
    operateSign !== "" &&
    display.textContent === String(secondNumber)
  ) {
    secondNumber = 0 - secondNumber;
    clearDisplay();
    changeDisplay(secondNumber);
  }
});

decimalButton.addEventListener("click", () => {
  if (operateSign === "" && !String(firstNumber).includes(".")) {
    firstNumber = String(firstNumber) + ".";
    clearDisplay();
    changeDisplay(firstNumber);
  } else if (operateSign !== "" && !String(secondNumber).includes(".")) {
    secondNumber = String(secondNumber) + ".";
    clearDisplay();
    changeDisplay(secondNumber);
  }
});
