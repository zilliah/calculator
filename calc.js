const numBtns = document.querySelectorAll(".nums button");
const opsBtns = document.querySelectorAll(".operators button");
const currDisplay = document.querySelector(".curr");
const equationDisplay = document.querySelector(".equation");
let storedVal;  //the stored value being used in the current equation
let currVal = 0; //the value currently being input by user
let currOp; //the current operation
let equation = ""; //a string representation of the current operation
let result; //the result of the operation


function updateDisplays(curr, eqn) {
    currDisplay.textContent = curr;
    equationDisplay.textContent = eqn;
}


//accept number input
numBtns.forEach(btn => {
    if (result && !currOp) {
        //TODO I think there was something w/ numbers getting squashed on when they shouldn't
        //butuhhhhhh ummmmm
    }
    btn.addEventListener("click", event => {
        let num = btn.getAttribute("value");
        //TODO limit number size
        currVal = currVal*10 + num*1;
        currDisplay.textContent = currVal; 
    });
});




//accept operand input
opsBtns.forEach(btn => {
    btn.addEventListener("click", event => {

        //1. simple  equation
        //no currOp
        if (currOp === undefined) {
            storedVal = currVal;
            currOp = btn.getAttribute("value");
            currVal = 0;
            result = 0;
            equation = `${storedVal} ${btn.textContent}`
            //let operate happen in equals or later operations
            updateDisplays(currVal, equation);
        } else { //have a currOp

            
            
            
            //chained eqn
            //have 2 values to work with
            // ===================== UNFINISHED TODO ======================
            
            result = operate(storedVal, currVal, currOp); //evaluate w/ old operator
            currVal = 0;
            storedVal = result;
            currOp = btn.getAttribute("value"); //new operator
            equation = `${storedVal} ${btn.textContent}`;
            updateDisplays(currVal, equation); 
            
            

            //multiple operands pushed in a row
            //no 2nd value
            //use 0 as 2nd value?
            //also has to work if 0 is actual value
            
            //wait can I somehow combine the evaluate() fxn below?
        }
        
        //2. chained eqn
        //already have a currOp
        //will need to evaluate

        // 3. multiple operands in a row
        //already have a currOp but no 2nd button
        //i guess could take 0 for values here
        //would be more consistent hmm

        //4. immediately after equals (take 0 for 1st value)




    });
});






//equals button evaluate
const equalsBtn = document.querySelector("button[value='equals'");
equalsBtn.addEventListener("click", event => evaluate());

function evaluate() {
    //4. after a number (no operand)
    if (currOp === undefined) {
        result = operate(currVal);
        equation = result
        updateDisplays(result, equation);
        currVal = 0;
        storedVal = 0;

    } else {
        //1-2. simple or chained equation
        result = operate(storedVal, currVal, currOp);
        if (result === "Error") {
            window.alert("Error! Cannot divide by zero!");
            clear();
            return;
        }
        // equation = `${equationDisplay.textContent} ${currVal}`
        equation = equation + " " + currVal;
        updateDisplays(result, equation);
        currVal = 0;
        storedVal = 0;
        currOp = undefined;
    }

    // currVal = 0;
    currOp = undefined;

}






/*  GAAAAAAAAAAAAAAAAAAAAAAAH ok i think past here it's ok */

//operate only, don't include any display stuff here
function operate(x, y, op) {
    if (y === undefined) return x;
    switch (op) {
        case "add":
            return x + y;
        case "subt":
            return x - y;
            case "mult": 
            return x * y;
        case "div":
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

//TODO remove this when done debugging
function showVals() {
    console.log("currVal is: " + currVal);
    console.log("storedVal is: " + storedVal);
    console.log("currOp is: " + currOp);
    console.log("result is: " + result);
}