const numBtns = document.querySelectorAll(".nums button");
const opsBtns = document.querySelectorAll(".operators button");
const currDisplay = document.querySelector(".curr");
const equationDisplay = document.querySelector(".equation");
let storedVal;  //the stored value being used in the current equation
let currVal = 0; //the value currently being input by user
let currOp; //the current operation
let result; //the result of the operation

//accept number input
numBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        let num = btn.getAttribute("value");
        currVal = currVal*10 + num*1;
        currDisplay.textContent = currVal; 
    });
});


//accept operand input
opsBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        if (currOp !== undefined) { //chaining operations
            let newOp = btn.getAttribute("value");
            storedVal = operate(currOp, storedVal, currVal);  //get result of prev thing
            currVal = 0;
            currOp = newOp;
        } else if (result !== undefined) {  //prior input
            storedVal = result;
            result = undefined;
        } else {
            storedVal = currVal;
            currVal = 0;
        }
        
        currOp = btn.getAttribute("value");
        //update displays
        equationDisplay.textContent = storedVal + " " + btn.textContent;
        currDisplay.textContent = 0;

    });
});




//equals button evaluate
const equalsBtn = document.querySelector("button[value='equals'");
equalsBtn.addEventListener("click", event => {
    result = operate(currOp, storedVal, currVal);
    
    if (result === "No operator") {  
        storedVal = currVal;
        currDisplay.textContent = currVal;
        equationDisplay.textContent = currVal;
        currVal = 0;
        return;
    } else if (result === "Error") {
        window.alert("Error! Cannot divide by 0.");
        clear();
        return;
    }
    //update displays
    equationDisplay.textContent += " " + currVal;
    currDisplay.textContent = result;  
    currVal = 0;
    storedVal = result;
    currOp = undefined;
})
//many clicking equals is bug


//operate only, don't include any display stuff here
function operate(op, x, y) {
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
            //should never get here! but its happening....
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
    currDisplay.textContent = 0;
    equationDisplay.textContent = 0; //eventually want to clear equation display, but creating styling problems atm
    storedVal = undefined;
    currVal = 0;
    currOp = undefined;
    result = undefined;
}