const {EventEmitter} = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on("start",()=>{
    console.log("start event is emitted.");
})

eventEmitter.emit("start");
