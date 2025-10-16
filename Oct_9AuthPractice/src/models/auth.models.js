const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username:String,
    password:String
}) 

const authModel = mongoose.model("user",authSchema);
module.exports = authModel