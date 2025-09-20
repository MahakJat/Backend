const express = require("express")

const app = express();

app.get("/home" ,(req,res)=>{
  res.send("home page")
})

app.get("/about",(req,res)=>{
    res.send("about page")
})

app.listen(3000, ()=>{
    console.log("server is running at port 3000")
})