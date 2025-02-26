const http= require('http');
const {homeHandler} = require('./controllers/controller')

const checkRoute=(req,res)=>{
    let route=req.url;
    let method= req.method;

    if(route=='/' &&  method =='get'){
        return homeHandler(req,res);
    }
}


const server = http.createServer(checkRoute)
server.listen(3000,()=>{
    console.log('Listening to server 3000')
})