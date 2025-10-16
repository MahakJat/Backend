const express = require("express");
const userModel = require("../model/auth.model");
const jwt = require("jsonwebtoken")

const router =  express.Router();

router.post("/register", async(req,res)=>{
    const {username , password} = req.body

    const user =  await userModel.create({
        username,
        password
    })

    // to create token first para unqui data of the user and the secret key
    const token = jwt.sign({id:user._id },process.env.JWT_SECRET)  ;

    res.cookie("token",token)
    res.status(201).json({
        message:"user created successfully",
        user,
        
    })
    
})

router.post("/login" ,async(req,res)=>{
    const {username ,password} = req.body;
    
    const user = await userModel.findOne({
         username
    })
    if(!user){
        res.send("invalid user")
    }
    const isPasswordValid = user.password === password;

    if(!isPasswordValid){
        res.send("password invalid")
    }
    res.send("login successfully")
})
router.get("/user",async (req,res)=>{
   const {token} = req.cookies;

   if(!token) return res.send("unauthorized");

  try{
    const userUqiueDataAndWhenItCreated = jwt.verify(token,process.env.JWT_SECRET)//the userUqiueData will have the unqiue data which was given while creating the object
    const id = userUqiueDataAndWhenItCreated.id;

    const user = await userModel.findOne({
        _id:id
    })
    return res.json({ 
        message:"user data fetched successfully",
        user:user
    })
  }catch(err){
    console.log(err)
    res.json({
     "message":"error is coming"
    })
  }


})
router.delete("/logout",(req,res)=>{

})

module.exports = router