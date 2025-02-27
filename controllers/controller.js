const fs = require("fs");
const path = require("path");
const {errorMessage,normalMessage,listUsersdata} = require('../helpers/ui')
const {readFile, writeFile} = require('../helpers/handlefiles')
const homePagehandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.write(normalMessage('Welcome to employee management'));
  res.end();
};
const addUserHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  readFile(path.join(__dirname, "..", "views", "form.html"),(err)=>{
     res.statusCode = 500;
     res.end()
     return
  },(data)=>{
    res.write(data.toString());
    res.end();
  }
)

};
const sendUserData = (req, res) => {
  let body = [];
  res.setHeader("Content-Type", "text/html");
  req.on("data", (chunck) => {
    body.push(chunck);
  });
  req.on("end", () => {
    let parsedBody = Buffer.concat(body).toString();
    let firstname = parsedBody.split("&")[0].split("=")[1];
    let lastname = parsedBody.split("&")[1].split("=")[1];
    
    if(firstname ==='' || lastname ===''){
      res.statusCode = 404;
      res.write(errorMessage('Please enter all fields'));
      res.end()
      return
    }
    readFile( path.join(__dirname, "..", "data", "users.json"),(err)=>{
      console.log(err);
      res.statusCode =500
      res.write(errorMessage('Internal Server error'))
      res.end();
      return;
    },(data)=>{
      let users = JSON.parse(data);
      for (let user of users) {
        console.log(user, firstname, lastname);
        if (user.firstname === firstname && user.lastname === lastname) {
          res.write(errorMessage("User already exists"))
          res.end();
          return;
        }
      }
      users.push({ firstname, lastname });
      writeFile( path.join(__dirname, "..", "data", "users.json"),JSON.stringify(users),(err)=>{
        console.log(err)
        res.write(errorMessage('Internal Server error'))
        res.statusCode =500
        res.end()
        return
      },()=>{
       
        res.statusCode =200
        res.write(normalMessage('User added sucessfully'))
        res.end();
      })
    }
  )
    
  });
};
const listUsers = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  readFile(path.join(__dirname, "..", "data", "users.json"),(err)=>{
    if (err) {
      console.log(err);
      res.statusCode= 500
      res.write(errorMessage('Internal Server error'))
      res.end();
      return;
    }
  },(data)=>{
    if (data.length === 0) {
      res.statusCode=404;
      res.write(errorMessage('No user found'))
      res.end();
      return;
    }
    res.write(listUsersdata(JSON.parse(data)));
    res.end();
  })
};
const handleNotFound =(req,res)=>{
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write(errorMessage('404 not found'))
  res.end()
}
module.exports = {
  homePagehandler,
  addUserHandler,
  sendUserData,
  listUsers,
  handleNotFound
};
