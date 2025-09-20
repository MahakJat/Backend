const express = require("express");
const app = express();


/* 
req.body 
req.query
req.params

req.headers & req.cookies //crediential data

*/

app.get("/home",(req,res)=>{
    res.send("I am at home page")
})

app.get("/about",(req,res)=>{
 res.send("I am at about page")
})

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})