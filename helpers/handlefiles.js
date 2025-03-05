const fs = require('fs');
//  helper functions to read and write files
const readFile =(path,errorcb,cb)=>{
   fs.readFile(path,(err,data)=>{
    if(err){
      errorcb(err)
      return
    }
    cb(data);
   })
}
const writeFile = (path,content,errorcb ,nextcb)=>{
    fs.writeFile(path,content,(err)=>{
        if(err){
            errorcb(err)
            return
        }
        
        nextcb()
    })
}


module.exports={
    readFile,
    writeFile
}
