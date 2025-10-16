const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");
app.use(express.json())
app.use(cookieParser())

app.use("/auth" ,authRouter)




module.exports = app


