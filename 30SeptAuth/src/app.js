const express = require("express");
const authRouter = require("./routes/auth.route.js");
const app = express();

app.use(express.json())

app.use("/auth",authRouter);
//the route will be /auth/login  and /login api will be in the auth.route.js




module.exports = app