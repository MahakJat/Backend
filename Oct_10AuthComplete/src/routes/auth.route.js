const express = require("express");
const userModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register",async (req,res)=>{
    const {username , password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        username
    })
    if(isUserAlreadyExist) {
     return res.json({
            message:"user already exist with this name"
        })
    }
   
    const user = await userModel.create({
        username,
        password
    })

    const token = jwt.sign({id:user._id},process.env.SECERT_KEY);
    res.cookie("token",token);  
    res.json({
        message:"user created successfully"
    })
})

// ye jab ka process hai jab user logged hai aur woh kuch request kar raha hai likin server ko kaise pata chale ki konsa user hai toh uske liye token use karte hai
router.get("/user", async(req,res)=>{
    const token = req.cookies.token;

    if(!token){
        res.json({
            message :"invalid user"
        })
    }

    try{
        const userID = jwt.verify(token,process.env.SECERT_KEY).id;
        const user =  await userModel.findOne({
            _id:userID
        })

        return res.json({
            user
        })
       
    }catch(err){
       return res.json({
        err:err
       })
    }
})


// login me bhi hum phir se token generate karte hai kyu ki token expire ho hoka hota hai
router.post("/login",async(req,res)=>{

    const {username,password} = req.body;

    const user = await userModel.findOne({
        username
    })
     
    if(!user){
     return res.json({
            message:"user account not found"
        })
    }

    const isValidPassword = user.password === password
    if(!isValidPassword){
        return res.json({
            message:"invalid password"
        })
    }
    
    const token = jwt.sign({id:user._id},process.env.SECERT_KEY);

    res.cookie("token",token);

    res.json({
        message:"user logged in successfully"
    })
})


router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"logged out successfully"
    })
})

module.exports = router