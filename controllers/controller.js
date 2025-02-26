const homeHandler =(req,res)=>{
    res.setHeader('Content-Type','text/html')
    res.write('Welcome to employee management')
    res.end()

}

module.exports={
    homeHandler
}