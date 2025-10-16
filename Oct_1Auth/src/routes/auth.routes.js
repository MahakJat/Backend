const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username: username,
    password: password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  ); //we create token with the sign method it takes first value as the user data which has unqiue value like _id and second is the secret key and the secret key never changes in the lifespan of the app

  res.json({
    message: "user created successfully",
    user: user,
    token,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.json({
      message: "invalid user",
    });
  }
  const isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    return res.json({
      message: "invalid password",
    });
  }

  res.json({
    message: "login successfully",
  });
});

router.get("/user", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    //if the token is not there
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  try {
    //   if token is invalid then it will give direct error
    //if the token is correct then it will return the  data which you have give to create the token and the  iat (the time when token is created)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // res.send(decoded);

    const user = await userModel.findOne({
        _id:decoded.id
    }).select("-password -__v") // by select("-password")  the password will not come from the database

    res.status(200).json({
      message:"user data fetched successfully",
      user
    })


  } catch (err) {
    return res.status(401).json({
      message: "unauthorized invalid token",
    });
  }
});

module.exports = router;
