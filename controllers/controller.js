const fs = require("fs");
const path = require("path");
const {readFile, writeFile} = require('../helpers/handlefiles')
/* Home Route (/)
Display a greeting message when accessing http://localhost:3000/.
Ensure the server returns HTTP status code 200 OK.
*/
const homePagehandler = (req, res) => {

  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.write('Welcome to employee management');
  res.end();
};
/* User Submission Route (/add-user)
Accept user input via body parsing (First Name & Last Name).
Store user data in a text file, preventing duplicate entries.
*/
const sendUserData = (req, res) => {
  let body = [];
  res.setHeader("Content-Type", "text/html");
  req.on("data", (chunck) => {
    // on data event
    body.push(chunck);
  });
  req.on("end", () => {
    // on end event
    let parsedBody = Buffer.concat(body).toString();
    parsedBody = JSON.parse(parsedBody);
    let firstname = parsedBody.firstname;
    let lastname = parsedBody.lastname;
       // check if fields are empty
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

        // check if user already exists
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
       // user added successfully
        res.statusCode =201
        res.write('User added sucessfully')
        
        res.end();
      })
    }
  )
    
  });
};
/* User List Route (/users)
Read and display stored users in JSON format.
If no users exist, return 404 Not Found with a message prompting user submission.
*/
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
   // check if no user found
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
// 404 page
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
