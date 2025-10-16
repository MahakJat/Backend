const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model.js")


router.post("/register", async(req,res)=>{
    const {username ,password} = req.body
    const user = await userModel.create({
        username:username,
        password:password
    })

    res.json({
        message:"user created successfully",
        user:user
    })
})



router.post("/login",async(req,res)=>{
    const {username, password} = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.json({
            message :"invalid user"
        })
    }
    const isPasswordValid = password === user.password

    if(!isPasswordValid){
          return res.json({
            message :"invalid password"
        })
    }

    res.json({
        message:"login successfully"
    })
})


module.exports = router