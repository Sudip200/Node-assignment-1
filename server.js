const http = require("http");

const {routesHandler} = require('./routes/routes')
const path = require("path");
const server = http.createServer(routesHandler);
server.listen(3000, () => {
  console.log("Listening to server 3000");
});
