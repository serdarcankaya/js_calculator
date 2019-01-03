//App Variables
let result = 0;
let userInput = "";
let operatorInput = "";
let resultInput = "";
let operatorText = "";
let equation = "";
let savedEquation = "";
let onepointUserString = "";

//DOM Element Selectors for Buttons
let numPad = document.querySelectorAll(".numbers");
let operatorPad = document.querySelectorAll(".operators");
let resultsPad = document.querySelectorAll(".results");
let pointButton = document.querySelector("#point");

//DOM Element Selector for Display
let resultDisplay = document.querySelector("#displayResult");
let historyDisplay = document.querySelector("#displayOldResult");

//For Converting Array-like Objects to Arrays
numPad = [...numPad];
operatorPad = [...operatorPad];
resultsPad = [...resultsPad];

//Event Listeners and Main Logic
//Listen Number Buttons and Make a User Input String
numPad.forEach(num => {
  num.addEventListener("click", () => {
    userInput += num.dataset.value;
    resultDisplay.textContent = userInput;
    console.log(userInput);
    return userInput;
  });
});

//Listen Math Operators and Create Equation
operatorPad.forEach(operator => {
  operator.addEventListener("click", () => {
    operatorInput = operator.dataset.value;
    if (operatorInput === "add") {
      operatorText = " + ";
    } else if (operatorInput === "substract") {
      operatorText = " - ";
    } else if (operatorInput === "multiply") {
      operatorText = " * ";
    } else if (operatorInput === "divide") {
      operatorText = " / ";
    }
    updateEquation(userInput);
    updateEquation(operatorText);
    saveEquation();
    showEquation();
    userInput = "";
  });
});

//Listen Function Operators and Update Results
resultsPad.forEach(results => {
  results.addEventListener("click", () => {
    resultInput = results.dataset.value;
    if (resultInput === "equals") {
      updateEquation(userInput);

      result = evaluateEquation(equation);
      result = parseFloat(Math.round(result * 100) / 100).toFixed(2);
      saveEquation();
      showEquation();
      showResult();
      userInput = "";
    } else if (resultInput === "clear") {
      resetClick();
      showEquation();
      showResult();
    } else if (resultInput === "delete") {
      deleteChar();
      saveEquation();
    }
  });
});


pointButton.addEventListener("click", () => {
  onepointUserString = pointLookup(userInput);
  userInput = onepointUserString;
});


// Helper Functions
function evaluateEquation(equation) {
  return eval(equation);
}

function updateEquation(updateComponent) {
  return equation += updateComponent;
}

function saveEquation() {
  savedEquation = equation;
}

function showEquation() {
  historyDisplay.textContent = savedEquation;
}

function showResult() {
  resultDisplay.textContent = result;
}

function deleteChar() {
  userInput = userInput.slice(0, -1);
  resultDisplay.textContent = userInput;
}

function resetClick() {
  result = 0;
  userInput = "";
  operatorInput = "";
  resultInput = "";
  operatorText = "";
  equation = "";
  savedEquation = "";
}


function pointLookup(userInput) {
  console.log("one point " + onepointUserString);
  let pos = userInput.indexOf(".");
  let secPos = userInput.indexOf(".", pos + 1);
  if (secPos !== -1) {
    return userInput = userInput.slice(0, secPos);
  }
  return userInput;
}