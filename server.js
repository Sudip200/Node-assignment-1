const http = require("http");
const {
  homePagehandler,
  addUserHandler,
  sendUserData,
  listUsers,
} = require("./controllers/controller");
const path = require("path");
const routesHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    return homePagehandler(req, res);
  }
  if (req.url === "/add-user" && req.method === "GET") {
    return addUserHandler(req, res);
  }
  if (req.url === "/add-user" && req.method === "POST") {
    console.log("Post request");
    return sendUserData(req, res);
  }
  if (req.url === "/users" && req.method === "GET") {
    return listUsers(req, res);
  }
};

const server = http.createServer(routesHandler);
server.listen(3000, () => {
  console.log("Listening to server 3000");
});
