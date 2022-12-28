let buffer = "0";
let runningTotal = 0;
let previousOperator;
let screen = document.querySelector(".screen");

function buttonClick(value) {
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	rerender();
}

function handleNumber(value) {
	if (buffer === "0") {
		buffer = value;
		//console.log(buffer);
	} else {
		buffer += value;
		//console.log(buffer);
	}
}

function handleMaths(value) {
	if (buffer === "0") {
		//do nothing
		return;
	}
	
	const intbuffer = parseInt(buffer);
	if (runningTotal === 0) {
		runningTotal = intbuffer;
	} else {
		flushOperation(intbuffer);
	}
	
	previousOperator = value;
	 buffer = "0";
	 console.log(runningTotal);
}

function flushOperation(intbuffer) {
	if (previousOperator === "+") {
		runningTotal += intbuffer;
	} else if (previousOperator === "-") {
		runningTotal -= intbuffer;
	} else if (previousOperator === "÷") {
		runningTotal /= intbuffer;
	} else if (previousOperator === "×") {
		runningTotal *= intbuffer;
	}
}

function handleSymbol(value) {
	switch (value) {
		case "C":
			buffer = "0";
			break;

		case "=":
			if(previousOperator===null){
				//do nothing
				return;
			};
			flushOperation(parseInt(buffer))
			buffer=""+runningTotal
			runningTotal=0;
			break;

		case "←":
			if (buffer.length === 1) {
				buffer = "0";
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
			console.log("back");
			break;

		case "+":
		case "-":
		case "÷":
		case "×":
			handleMaths(value);
			break;
	}
	rerender();
}

function init() {
	console.log("hi");
	document
		.querySelector(".calc-buttons")
		.addEventListener("click", function (event) {
			buttonClick(event.target.innerText);
		});
}

function rerender() {
	screen.textContent = buffer;
}

function equalto(){
	screen.innerContent=runningTotal;
}

init();
