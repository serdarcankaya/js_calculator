//This is the method with arrays and separate functions instead of eval()
//Works fine but get buggy when you write equation like 12 + 3 * 2 / 7
//Calculates always with the last operator.
//Delete Button, Point Button and Keyboard Support is not implemented

let result = 0;
let storedInput = [];
let userInput = 0;
let operatorInput = "";
let resultInput = "";
let history = "";
let operatorText = "";
let historyResult = 0;

let numPad = document.querySelectorAll(".numbers");
let operatorPad = document.querySelectorAll(".operators");
let resultsPad = document.querySelectorAll(".results");

let resultDisplay = document.querySelector("#displayResult");
let historyDisplay = document.querySelector("#displayOldResult");

historyDisplay.textContent = history;

numPad = [...numPad];
operatorPad = [...operatorPad];
resultsPad = [...resultsPad];

numPad.forEach(num => {
  num.addEventListener("click", () => {
    userInput += num.dataset.value;
    userInput = Number(userInput);
    resultDisplay.textContent = userInput;
    return userInput;
  });
});

operatorPad.forEach(operator => {
  operator.addEventListener("click", () => {
    operatorInput = operator.dataset.value;
    storedInput.push(userInput);
    if (historyResult === 0) {
      determineOperatorText(operatorInput);
      updateHistory();
      userInput = 0;
    } else if (historyResult !== 0) {
      operatorText = "";
      determineOperatorText(operatorInput);
      updateHistory();
      clearAndStoreHistory();
      userInput = 0;
    }
    console.log("*******************Opeator Pressed******************");
    console.log("User input after Opeator Presses is " + userInput);
    console.log("Stored input after Opeator Presses is " + storedInput);
    console.log("Result input after Opeator Presses is " + result);
    console.log("History input after Opeator Presses is " + history);
    console.log(
      "History Result input after Opeator Presses is " + historyResult
    );
    console.log("Operator Text input after Opeator Presses is " + operatorText);
    console.log("*******************---------------******************");
    return operatorInput;
  });
});

resultsPad.forEach(results => {
  results.addEventListener("click", () => {
    resultInput = results.dataset.value;
    if (resultInput === "equals") {
      storedInput.push(userInput);
      resultDisplay.textContent = operate(operatorInput, storedInput);
      operatorText = " = ";
      updateHistory();
      clearAndStoreHistory();
      userInput = 0;
      resultInput = "";
      console.log("*******************Result Pressed******************");
      console.log("User input after Result Presses is " + userInput);
      console.log("Stored input after Result Presses is " + storedInput);
      console.log("Result input after Result Presses is " + result);
      console.log("History input after Result Presses is " + history);
      console.log(
        "History Result input after Result Presses is " + historyResult
      );
      console.log(
        "Operator Text input after Result Presses is " + operatorText
      );
      console.log("*******************---------------******************");
    } else if (resultInput === "clear") {
      clearButton();
      console.log("*******************Clear Pressed******************");
      console.log("User input after Clear Presses is " + userInput);
      console.log("Stored input after Clear Presses is " + storedInput);
      console.log("Result input after Clear Presses is " + result);
      console.log("History input after Clear Presses is " + history);
      console.log(
        "History Result input after Clear Presses is " + historyResult
      );
      console.log("Operator Text input after Clear Presses is " + operatorText);
      console.log("*******************---------------******************");
    }
  });
});

function updateHistory() {
  if (historyResult === 0) {
    history += storedInput.slice(-1) + operatorText;
    historyDisplay.textContent = history;
  } else if (historyResult !== 0) {
    history = historyResult + operatorText;
    historyDisplay.textContent = history;
  }
}

function clearAndStoreHistory() {
  historyResult = result;
  storedInput = [historyResult];
}

function clearButton() {
  result = 0;
  userInput = 0;
  operatorInput = "";
  resultInput = "";
  history = "";
  operatorText = "";
  historyResult = 0;
  historyDisplay.textContent = history;
  resultDisplay.textContent = result;
  storedInput = [];
  updateHistory();
  clearAndStoreHistory();
}

function determineOperatorText(operatorInput) {
  if (operatorInput === "add") {
    operatorText = " + ";
  } else if (operatorInput === "substract") {
    operatorText = " - ";
  } else if (operatorInput === "multiply") {
    operatorText = " * ";
  } else if (operatorInput === "divide") {
    operatorText = " / ";
  }
}

function add([x, ...args]) {
  result = x;
  args.forEach(arg => {
    result += arg;
  });
  return result;
}

function substract([x, ...args]) {
  result = x;
  args.forEach(arg => {
    result -= arg;
  });
  return result;
}

function multiply([x, ...args]) {
  result = x;
  args.forEach(arg => {
    result *= arg;
  });
  return result;
}

function divide([x, ...args]) {
  result = x;
  args.forEach(arg => {
    result /= arg;
  });
  return result;
}

function operate(operator, x, ...args) {
  switch (operator) {
    case "add":
      return add(x, ...args);
    case "substract":
      return substract(x, ...args);
    case "multiply":
      return multiply(x, ...args);
    case "divide":
      return divide(x, ...args);
  }
}