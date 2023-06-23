const getFactorial=(number) =>{
    if ( number <=1 ) {
        return 1;
    }
    return number * getFactorial(number-1);
}

module.exports = {getFactorial};