const express = require("express");
const authModel = require("../models/auth.models.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

// api =>
//     /register /post
//     /login /post
//     /user /get
//     /delete /delete

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await authModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.SECERT_KEY);
  res.cookie("token", token);

  res.status(201).json({ message: "user created successfully", user });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await authModel.findOne({
    username,
  });
  if (!user) {
    res.status(401).json({
      message: "invalid user unauthorised",
    });
  }
  const isValidPassword = password === user.password;
  if (!isValidPassword) {
    res.status(401).json({
      message: "invalid password unauthorised",
    });
  }
  res.status(200).json({
    message: "user logged in successfully",
  });
});

//token to find out which req belongs to which user
// server hume token dete hai aur jab bhi hum new req karni hoti hai toh req ke token bhi jata hai toh token ko check karge ki token valid hai ki nhi agar valid hai toh token object return karta hai object me woh unqiue property rehti hai usse token bana hota hai
router.get("/user", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "unauthorized user",
      m2:"hello"
    });
  }
  try {
    const decode = jwt.verify(token, process.env.SECERT_KEY); //secret ki help se token bana hota hai
    const user = await authModel
      .findOne({
        _id: decode.id,
      }).select("-password -__v")
      
    res.status(201).json({
      message: "user data fetched successfully",
      user
    });
  } catch (err) {
    console.log(err)
    res.status(401).json({
      message: "unauthorized user sdfg",
    });
  }
});

module.exports = router;
