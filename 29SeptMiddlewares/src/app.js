const express = require("express");
const indexRoute = require("./routes/index.routes.js");

const app = express();


// syntax of middleware
app.use((req,res,next)=>{
   console.log("this middleware is betweeen app and route")
   next();//if we will not call next the req aage nhi badegi
})


app.use("/",indexRoute);





module.exports = app