const express = require("express");
const app = express();
const cookieParser =require("cookie-parser")
const authRoute = require("./routes/auth.route.js")

app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRoute)



module.exports = app;