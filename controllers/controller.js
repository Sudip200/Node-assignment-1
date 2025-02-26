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
    fs.appendFile(
      path.join(__dirname, "..", "data", "users.txt"),
      parsedBody + "\n",
      (err) => {
        if (err) {
          console.log(err);
          res.end();
          return;
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      }
    );
  });
};

module.exports = {
  homePagehandler,
  addUserHandler,
  sendUserData,
};
