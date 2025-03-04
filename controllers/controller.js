const fs = require("fs");
const path = require("path");
const {readFile, writeFile} = require('../helpers/handlefiles')
const homePagehandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.write('Welcome to employee management');
  res.end();
};
const sendUserData = (req, res) => {
  let body = [];
  res.setHeader("Content-Type", "text/html");
  req.on("data", (chunck) => {
    body.push(chunck);
  });
  req.on("end", () => {
   
    let parsedBody = Buffer.concat(body).toString();
    parsedBody = JSON.parse(parsedBody);
    let firstname = parsedBody.firstname;
    let lastname = parsedBody.lastname;

    if(firstname ==='' || lastname ===''){
      res.statusCode = 400
      res.write('Please enter all fields');
      res.end()
      return
    }
    readFile( path.join(__dirname, "..", "data", "users.json"),(err)=>{
      console.log(err);
      res.statusCode =500
      res.write('Internal Server error')
      res.end();
      return;
    },(data)=>{
      let users = JSON.parse(data);
      for (let user of users) {
        console.log(user, firstname, lastname);
        if (user.firstname === firstname && user.lastname === lastname) {
          res.write("User already exists")
          res.end();
          return;
        }
      }
      users.push({ firstname, lastname });
      console.log(users);
      writeFile( path.join(__dirname, "..", "data", "users.json"),JSON.stringify(users),(err)=>{
        console.log(err)
        res.write('Internal Server error')
        res.statusCode =500
        res.end()
        return
      },()=>{
       
        res.statusCode =201
        res.write('User added sucessfully')
        res.end();
      })
    }
  )
    
  });
};
const listUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  readFile(path.join(__dirname, "..", "data", "users.json"),(err)=>{
    if (err) {
      console.log(err);
      res.statusCode= 500
      res.write('Internal Server error')
      res.end();
      return;

    }
  },
  (data)=>{
   
    if (JSON.parse(data.toString()).length === 0) {
      res.statusCode=404;
      res.write('No user found')
      res.end();
      return;
    }
    console.log(data.toString())
    res.write(data.toString())
    res.end();
  })
};
const handleNotFound =(req,res)=>{
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write('404 not found')
  res.end()
}
module.exports = {
  homePagehandler,
  sendUserData,
  listUsers,
  handleNotFound
};
