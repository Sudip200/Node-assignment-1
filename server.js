const http = require("http");
const { routesHandler } = require("./routes/routes");
const server = http.createServer(routesHandler);

/* 1. Set Up a Node.js Server
Initialize a new GitHub project with Node.js.
Create a Node.js server that listens on port 3000.
*/
server.listen(3000, () => {
  console.log("Listening to server 3000");
});
