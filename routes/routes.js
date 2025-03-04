const {
    homePagehandler,
    sendUserData,
    listUsers,
    handleNotFound
  } = require("../controllers/controller");

const routesHandler = (req, res) => {
    console.log(req.url, req.method);
    if (req.url === "/") {
      return homePagehandler(req, res);
    }
    if (req.url === "/add-user" && req.method === "POST") {
      console.log("Post request");
      return sendUserData(req, res);
    }
    if (req.url === "/users" && req.method === "GET") {
      
      return listUsers(req, res);
    }
    return handleNotFound(req,res)
  };

module.exports={
    routesHandler
}