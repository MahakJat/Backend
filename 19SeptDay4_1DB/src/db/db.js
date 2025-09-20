const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect("").then(()=>{
        console.log("connected to db")
    }).catch(err => console.log(err))
}

module.exports = connectToDB