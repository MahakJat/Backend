const express = require("express");
const connectToDB = require("./src/db/db.js")
const app = express()
connectToDB();



app.listen(3000,()=>{
    console.log("server is running at port 3000")
})