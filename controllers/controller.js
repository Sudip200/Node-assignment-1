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
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    try {
      let parsedBody = Buffer.concat(body).toString();
      parsedBody = JSON.parse(parsedBody);
      let firstname = parsedBody.firstname;
      let lastname = parsedBody.lastname;

      if (firstname === '' || lastname === '') {
        res.statusCode = 400;
        res.write('Please enter all fields');
        res.end();
        return;
      }

      readFile(path.join(__dirname, "..", "data", "users.json"), (err) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.write('Internal Server error');
          res.end();
          return;
        }
      }, (data) => {
        try {
          let users = JSON.parse(data);
          for (let user of users) {
            if (user.firstname === firstname && user.lastname === lastname) {
              res.statusCode = 400;
              res.write("User already exists");
              res.end();
              return;
            }
          }
          users.push({ firstname, lastname });
          writeFile(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(users), (err) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.write('Internal Server error');
              res.end();
              return;
            }
          },()=>{
            res.statusCode = 201;
            res.write('User added successfully');
            res.end();
          }
        );
        } catch (parseError) {
          console.log(parseError);
          res.statusCode = 500;
          res.write('Internal Server error');
          res.end();
        }
      });
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.write('Internal Server error');
      res.end();
    }
  });
};
/* User List Route (/users)
Read and display stored users in JSON format.
If no users exist, return 404 Not Found with a message prompting user submission.
*/
const listUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  try {
    readFile(path.join(__dirname, "..", "data", "users.json"), (err) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.write('Internal Server error');
        res.end();
        return;
      }
    },
    (data) => {
      try {
        const users = JSON.parse(data.toString());
        if (users.length === 0) {
          res.statusCode = 404;
          res.write('No user found please add user');
          res.end();
          return;
        }
        res.write(data.toString());
        res.end();
      } catch (parseError) {
        console.log(parseError);
        res.statusCode = 500;
        res.write('Internal Server error');
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.write('Internal Server error');
    res.end();
  }
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
