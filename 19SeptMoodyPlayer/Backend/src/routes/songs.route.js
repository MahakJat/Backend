const express = require("express");
const multer = require("multer"); //to read the data of the form-data
const router = express.Router(); //alag se api create karne ke liye express.Router ka use karte hai
const uploadFile = require("../service/storage.service");
const songsModel = require("../models/songs.model");
const uploads = multer({storage:multer.memoryStorage()});  //memoryStorage //multer needs to store the file coming so it temporary  stores it in the servers RAM (Primary memory ,temporary storage)

// uploads.single("audio") for the audio file the name should be same as that you are sending data in

router.post("/songs",uploads.single("audio"),async (req,res)=>{ //ye joh api hum create kiya hai likin ye api express ko pata nhi chalta hai agar express ko batana hai to app.use("/",songRoutes) ye likhna hota hai jaha hum api use karne wala hai
 
    const fileData = await uploadFile(req.file) //uploading song of the image kit which is given to the server //whatever the result the upload file function will be giving coming in the fileData
    console.log(fileData)
   

    // creating data in the model the url will have the url of the song which is given by imagekit
   
    const song = await songsModel.create({
        title:req.body.title,
        artist:req.body.artist,
        mood:req.body.mood,
        audio:fileData.url //from imagekit
    })
   
     
   
   
    res.status(201).json({ //status(201) when we create new resoure
        Message:"data recieved",
        song:song,
    })
})


router.get("/songs",async (req,res)=>{
    const {mood} = req.query;

    const songs = await songsModel.find({
        mood:mood
    })

    res.status(200).json({
        Message:"songs fetched successfully",
        songs:songs
    })
})

module.exports = router;


// for multiple file uploads.array