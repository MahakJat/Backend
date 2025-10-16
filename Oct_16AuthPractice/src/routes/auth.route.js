const express = require("express");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userAlreadyExist = await userModel.findOne({ username });

  if (userAlreadyExist) {
    res.json({
      message: "username already exist",
    });
  }

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.SECERT_KEY);
  res.cookie("token", token);
  res.json({
    message: "user created successfully",
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    res.json({
      message: "user doesnot exist",
    });
  }
  const isValidPassword = user.password === password;

  if (!isValidPassword) {
    res.json({
      message: "password incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECERT_KEY);
  res.cookie("token", token);
  res.json({
    message: "user logged in successfully",
  });
});

router.get("/user", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({
      message: "unauthorised user",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.SECERT_KEY);
    const user = await userModel.findOne({ _id: decode.id });
    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout",async(req,res)=>{
    res.clearCookie("token")
    res.json({
        "message":"logged out successfully"
    })
})

module.exports = router;
