const displaySum = (sum ) => {
    console.log(`Sum of two number is : ${sum}`);
}

const performAddition = (num1,num2,displaySum) => {
    const sum = num1 + num2 ;
    displaySum(sum);
}
performAddition(12,12,displaySum);