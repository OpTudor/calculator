const numberButton = document.querySelectorAll(".numberButton");
const clearButton = document.querySelector(".clearButton");
const operationButton = document.querySelectorAll(".operationButton");
const display = document.getElementById("display");
const equalButton = document.querySelector(".equalButton");
const signButton = document.querySelector(".signButton");
const decimalButton = document.querySelector(".decimalButton");
display.textContent = 0;

let firstNumber = "",
  secondNumber = "",
  result = "",
  operateSign = "",
  percentage = false;

function operate(a, b, operation) {
  switch (operation) {
    case "+":
      result = Number(a) + Number(b);
      break;
    case "-":
      result = Number(a) - Number(b);
      break;
    case "x":
      result = Number(a) * Number(b);
      break;
    case "÷":
      result = Number(a) / Number(b);
      break;
    case "%":
      result = (Number(a) / 100) * Number(b);
      break;
  }
  let decimals = result % 1;
  if (decimals !== 0) {
    result = result.toFixed(2);
  } else result = Math.floor(result);
}
function operatePercentage(a, b, operation) {
  switch (operation) {
    case "+":
      result = Number(a) + (Number(b) / 100) * Number(a);
      break;
    case "-":
      result = Number(a) - (Number(b) / 100) * Number(a);
      break;
    case "x":
      result = Number(a) * (Number(b) / 100);
      break;
    case "÷":
      result = Number(a) / (Number(b) / 100);
      break;
    case "%":
      display.textContent = "Error";
      break;
  }
  let decimals = result % 1;
  if (decimals !== 0) {
    result = result.toFixed(2);
  } else result = Math.floor(result);
}

numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    if (operateSign === "") {
      changeDisplay(number.textContent);
      firstNumber = Number(display.textContent);
    } else {
      if (secondNumber === "") clearDisplay();
      changeDisplay(number.textContent);
      secondNumber = Number(display.textContent);
    }
  });
});

operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    if (secondNumber === "") {
      operateSign = operation.textContent;
      result = "";
    } else if (operation.textContent === "%") {
      percentage = !percentage;
    }
  });
});

function changeDisplay(number) {
  if (
    (number === "." && display.textContent.includes(".")) ||
    (display.textContent.length > 7 && display.textContent !== "Infinity")
  ) {
    return;
  }

  if (
    (display.textContent === "0" && number !== ".") ||
    isNaN(display.textContent) ||
    !isFinite(display.textContent)
  ) {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

equalButton.addEventListener("click", () => {
  if (operateSign !== "") {
    if (firstNumber === 0) {
      if (percentage) {
        operatePercentage(result, secondNumber, operateSign);
      } else operate(result, secondNumber, operateSign);
    } else {
      if (percentage) {
        operatePercentage(firstNumber, secondNumber, operateSign);
      } else operate(firstNumber, secondNumber, operateSign);
    }
    if (display.textContent !== "Error") {
      clearDisplay();
      changeDisplay(result);
    }
    firstNumber = result;
    secondNumber = "";
    operateSign = "";
    percentage = false;
  }
});

clearButton.addEventListener("click", () => {
  display.textContent = 0;
  firstNumber = "";
  secondNumber = "";
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
