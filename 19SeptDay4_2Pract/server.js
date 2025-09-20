const express = require("express")
const connectToDB = require("./src/db/db.js")
const notesModel = require("./src/models/notes.model.js")

const app = express();
connectToDB()

app.use(express.json())

app.post("/notes",async(req,res)=>{

    const {title,content} = req.body
    
    await notesModel.create({
        title:title,
        content:content
    })
    res.json({
        message:"note created successfully"
    })
})

app.get("/notes" , async(req,res)=>{
    const notes = await notesModel.find();

    res.json({
        message :"All the notes",
        notes:notes
    })
})

app.delete("/notes/:id",async(req,res)=>{
    const _id = req.params.id;
    await notesModel.findOneAndDelete(
        {_id : _id}
    )
    res.json({
        message:"note deleted successfully"
    })
})

app.patch("/notes/:id", async(req,res)=>{
    const {title} = req.body
    const _id = req.params.id;

    await notesModel.findByIdAndUpdate({
       _id
    },{
       title:title
    })
    res.json({
        message :"notes updated successfully"
    })
})



app.listen(3000 ,()=>{
    console.log("server is running at port 3000")
})