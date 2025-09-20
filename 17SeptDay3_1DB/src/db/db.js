const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect("mongodb+srv://mahakjat112:wuldnhdFl2ItIXrI@cluster0.pwaptfa.mongodb.net/").then(()=>{
        console.log("connect to db")
    }).catch(err => console.log(err))
}

module.exports = connectToDB