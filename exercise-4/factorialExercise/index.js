const {getFactorial} = require("./factorialModule");
const calculateFactorial = (number)=> {
    console.log(getFactorial(number));
}

calculateFactorial(5);