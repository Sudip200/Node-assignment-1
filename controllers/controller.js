const fs = require("fs");
const path = require("path");
const homePagehandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.write("<h1>Welcome to employee management</h1>");
  res.end();
};
const addUserHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  fs.readFile(path.join(__dirname, "..", "views", "form.html"), (err, data) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }

    res.write(data.toString());
    res.end();
  });
};
const sendUserData = (req, res) => {
  let body = [];
  req.on("data", (chunck) => {
    body.push(chunck);
  });
  req.on("end", () => {
    let parsedBody = Buffer.concat(body).toString();
    let firstname = parsedBody.split("&")[0].split("=")[1];
    let lastname = parsedBody.split("&")[1].split("=")[1];
    fs.readFile(
      path.join(__dirname, "..", "data", "users.json"),
      (err, data) => {
        if (err) {
          console.log(err);
          res.end();
          return;
        }
        let users = JSON.parse(data);
        for (let user of users) {
          console.log(user, firstname, lastname);
          if (user.firstname === firstname && user.lastname === lastname) {
            res.end("User already exists");
            return;
          }
        }
        users.push({ firstname, lastname });
        fs.writeFile(
          path.join(__dirname, "..", "data", "users.json"),
          JSON.stringify(users),
          (err) => {
            if (err) {
              console.log(err);
              res.end();
              return;
            }
            res.end("User added successfully");
          }
        );
      }
    );
  });
};
const listUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  fs.readFile(path.join(__dirname, "..", "data", "users.json"), (err, data) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }
    if (data.length === 0) {
      res.end("No user found");
      return;
    }
    res.write(data);
    res.end();
  });
};

module.exports = {
  homePagehandler,
  addUserHandler,
  sendUserData,
  listUsers,
};
