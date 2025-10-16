const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const authRoute = require("./routes/auth.route.js")

app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoute);



module.exports = app