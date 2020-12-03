const numBtns = document.querySelectorAll(".nums button");
const opsBtns = document.querySelectorAll(".operators button");
const currDisplay = document.querySelector(".curr");
const equationDisplay = document.querySelector(".equation");
let storedVal;  //the stored value being used in the current equation
let currVal = 0; //the value currently being input by user
let currOp; //the current operation
let equation = ""; //a string representation of the current operation
let result; //the result of the operation
let floatLimit = 14; //max number of decimals shown on the screen


function updateDisplays(curr, eqn) {
    currDisplay.textContent = curr;
    equationDisplay.textContent = eqn;
}


//accept number input
numBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        if (result) {
            storedVal = result;
            result = undefined;
            if (currOp) {
                equation = storedVal + " " + currOp;
                updateDisplays(0, equation);
            } else {  
                updateDisplays(0, "");  
            }
        } 
        let num = btn.getAttribute("value");
        let checkNum = currVal*10 + num*1;
        if ((Number.isSafeInteger(checkNum))) {
            currVal = currVal*10 + num*1;
            currDisplay.textContent = currVal; 
        }
    });
});

//accept operand input
opsBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        if (currOp === undefined) { //no currOp, move stuff around but don't actually operate
            if (result) { //using the previous result for upcoming operation
                storedVal = result;
                result = undefined;
            } else { //no result, this is the start of a new thing
                storedVal = currVal;
                currVal = 0;
            }
            currOp = btn.textContent;
            equation = `${storedVal} ${currOp}`
            updateDisplays(currVal, equation);
        } else { //have a currOp, do the operation
            if (result) {
                storedVal = result;
                result = undefined;
            }
            result = operate(storedVal, currVal, currOp); 
            if (result === "Error") {
                window.alert("Error! Cannot divide by zero!");
                clear();
                return;
            }
            currVal = 0;
            storedVal = result;
            currOp = btn.textContent;
            equation = `${storedVal} ${currOp}`;
            updateDisplays(currVal, equation); 
        }
    });
});

//equals button evaluate
const equalsBtn = document.querySelector("button[value='equals'");
equalsBtn.addEventListener("click", event => evaluate());
function evaluate() {
    //after a number (no operand)
    if (currOp === undefined) {
        result = operate(currVal);
        equation = result
        updateDisplays(result, equation);
        currVal = 0;
        storedVal = 0;

    } else {
        //simple or chained equation
        result = operate(storedVal, currVal, currOp);
        if (result === "Error") {
            window.alert("Error! Cannot divide by zero!");
            clear();
            return;
        }
        equation = equation + " " + currVal;
        updateDisplays(result, equation);
        currVal = 0;
        storedVal = 0;
        currOp = undefined;
    }
    currOp = undefined;

}

//operate only, don't include any display stuff here
function operate(x, y, op) {
    if (y === undefined) return x;
    switch (op) {
        case "+":
            return x + y;
        case "-":
            return x - y;
            case "×": 
            return x * y;
        case "÷":
            return divide(x,y);
        default:
            return "No operator";
    }
}

        
//divide - don't allow division by 0
function divide(a, b) {
    if (currVal === 0) {
        return "Error";
    } else {
        return a / b;
    }
}

//clear - clears everything
const clearBtn = document.querySelector("button[value='clear'");
clearBtn.addEventListener("click", event => clear());
function clear() {
    updateDisplays(0, "");
    storedVal = undefined;
    currVal = 0;
    currOp = undefined;
    result = undefined;
}

function showVals() {
    console.log("currVal is: " + currVal);
    console.log("storedVal is: " + storedVal);
    console.log("currOp is: " + currOp);
    console.log("result is: " + result);
}