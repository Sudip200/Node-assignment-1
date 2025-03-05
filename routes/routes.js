const {
    homePagehandler,
    sendUserData,
    listUsers,
    handleNotFound
  } = require("../controllers/controller");
//2. Implement Routes
const routesHandler = (req, res) => {
    console.log(req.url, req.method);
    // home page
    if (req.url === "/" && req.method === "GET") {
      return homePagehandler(req, res);
    }
    // add user
    if (req.url === "/add-user" && req.method === "POST") {
      console.log("Post request");
      return sendUserData(req, res);
    }
    // list users
    if (req.url === "/users" && req.method === "GET") {
      
      return listUsers(req, res);
    }
    // 404 page
    return handleNotFound(req,res)
  };

module.exports={
    routesHandler
}