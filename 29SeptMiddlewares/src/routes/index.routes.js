const express = require("express");

const router = express.Router(); //ye ek router return karta hai jiski help se hum api create kar sakte hai

router.use((req,res,next)=>{
     console.log("this middleware is between the router and api")
     next()
})


router.get("/",(req,res)=>{
    res.json({
        message :"connected to api"
    })
})

module.exports = router