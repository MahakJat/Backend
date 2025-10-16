const express = require("express");
const songRoutes = require("../src/routes/songs.route.js");
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.use("/",songRoutes); //hum express ko ye bata rahe hai ki hum kuch aur api create kiya hai unhe yaha use karna hai //server ko batane ke liya ki humne aur bhi api create kiya hai




module.exports = app;