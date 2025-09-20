const express = require("express")
const app = express()
const connectToDB = require("./src/db/db.js")
const notesModel = require("./src/models/notes.model.js")

app.use(express.json())
connectToDB()
app.get("/",(req,res)=>{
    res.send("home page")
})

app.post("/notes" ,async (req,res)=>{
    const {title, content} = req.body;
  
    await notesModel.create({
        title,
        content
    })

    res.json({
        title:title,
        content:content
    })
})


app.get("/notes", async(req,res)=>{
    
    const allNotes = await notesModel.find();

    res.json({
        message:"notes fetched successfully",
         notes : allNotes,
    })
})

app.delete("/notes/:id",async(req,res)=>{
    const _id = req.params.id;
    const notes = await notesModel.findByIdAndDelete({
    _id
    })
    res.json({
        "message":"notes deleted successfully",
         notes:notes
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const noteId = req.params.id;
    const {title} = req.body
    const notes = await notesModel.findOneAndUpdate({
        _id :noteId
    },{
        title : title
    })

    res.json({
        message:"title updated successfully",
       
    })
})

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})