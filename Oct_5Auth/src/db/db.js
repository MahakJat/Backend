const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connect to db")
    }).catch(err => console.log(err))
}

module.exports = connectToDB;