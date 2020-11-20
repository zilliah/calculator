const numBtns = document.querySelectorAll(".nums button");
const opsBtns = document.querySelectorAll(".operators button");
const currDisplay = document.querySelector(".curr");
const equationDisplay = document.querySelector(".equation");
let storedVal;  //the stored value being used in the current equation
let currVal = 0; //the value current being input by user
let currOp; //the current operation
let result = "a result hello"; //the result of the operation

//accept number input
numBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        let num = btn.getAttribute("value");
        console.log(num);
        currVal = currVal*10 + num*1;
        currDisplay.textContent = currVal; 
    });
});


//accept operand input
opsBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        currOp = btn.getAttribute("value");

        storedVal = currVal;
        currVal = 0;
        equationDisplay.textContent = storedVal + " " + btn.textContent;
        currDisplay.textContent = 0;
        //TODO also need to call "operate" if this is part of an equn
    });
});


//clear - clears everything
//maybe later can add a 1-click to clear curr val, 2-click to clear everything, but ignore this for now
const clearBtn = document.querySelector("button[value='clear'");
clearBtn.addEventListener("click", event => {
    currDisplay.textContent = 0;

    equationDisplay.textContent = 0; //eventually want to clear equation display, but creating styling problems atm
    storedVal = undefined;
    currVal = 0;
    currOp = undefined;
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
    }
    //update displays
    equationDisplay.textContent += " " + currVal;
    currDisplay.textContent = result;  
    currVal = 0;
    storedVal = result;
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
    }
}


//divide - don't allow division by 0
//todo need to allow add'l input here
function divide(a, b) {
    if (currVal === 0) {
        window.alert("Cannot divide by 0.");
        return "Error";
    } else {
        return a / b;
    }
}