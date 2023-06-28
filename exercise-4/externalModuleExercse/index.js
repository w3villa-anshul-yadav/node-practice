const http = require("http"); //core module
const { getFactorial } = require("../factorialExercise/factorialModule"); //local module
const greet = require("./greetModule"); //local module
const R = require("ramda"); // npm package module

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });

    console.log("server started");

    response.write(greet());
    console.log(greet());
    response.write(`<br>factorial of 50 is : ${getFactorial(50)}`);
    console.log(`factorial of 50 is : ${getFactorial(50)}`);

    const age = [20, 30, 10];
    const forEachBlock = (age) => {
        response.write(`<br> Age is : ${age}  `);
        console.log(` Age is : ${age}  `);
    };
    R.forEach(forEachBlock, age);

    response.end();
}).listen("5000");
console.log(`Server started at http://localhost:5000/`);
