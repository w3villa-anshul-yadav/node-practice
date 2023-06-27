const mongoose = require("mongoose");

const conncetDB = async ()=>{
   try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("connected to DataBase");
   }catch (err) {
        console.log(err);
        process.exit(1);
   }
}
module.exports = conncetDB;