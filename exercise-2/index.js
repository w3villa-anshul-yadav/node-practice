const fs = require('fs/promises');

const  readWriteFile = async ()=>{
    try{
        const data = await fs.readFile("./file1.txt","utf8",);
        fs.writeFile('./file2.txt',data.concat("\n\nThis file is written using nodejs. "))
        console.log("File Written Successfully ");
    }catch(err){
        console.log("some error occureed ",err);
    }
}
readWriteFile();