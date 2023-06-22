const callback = ()=>{
    console.log("Hey I appeared after 1 Second");
}

const delay=(callback)=> {
    setTimeout(()=>{
        callback();
    },1000);
}

delay(callback);
