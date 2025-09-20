const express = require("express")
const connectToDB = require("./src/db/db.js")
const app = express();
app.use(express.json())

connectToDB();

app.get("/",(req,res)=>{
    res.send("home page")
})
app.post("/notes",(req,res)=>{
   res.json({
      notes :req.body,
      message:"notes created"

   })
})

app.listen(3000 ,()=>{
    console.log("server is running at port 3000")
})