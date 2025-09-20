const express = require("express")
const app = express();

let notes = [];
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello Notes")    
})

app.post("/notes" ,(req,res)=>{
   notes.push(req.body);
   res.json({
    message:"notes created",
   })
})
app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index" ,(req,res)=>{
    const index = req.params.index;
    delete notes[index]
    res.json({
        "message":"notes deleted successfully"
    })
})
// update
app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    console.log(req.body)
    notes[index].description = req.body.description
    res.json({
        "message" : "notes update successfully"
    })
})

app.listen(3000 , ()=>{
    console.log("server is running at port 3000")
})