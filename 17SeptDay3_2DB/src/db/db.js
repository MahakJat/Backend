const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect("").then(()=>{
        console.log("connect to db")
    }).catch((err)=>console.log(err))
}

module.exports = connectToDB