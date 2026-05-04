import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// Schema
const NoteSchema = new mongoose.Schema({
  text: String
});

const Note = mongoose.model("Note", NoteSchema);

// Save note
app.post("/save", async (req,res)=>{
  const note = new Note({ text: req.body.note });
  await note.save();
  res.json({ success:true });
});

// Get notes
app.get("/notes", async (req,res)=>{
  const notes = await Note.find();
  res.json(notes);
});

// AI route
app.post("/ai", async (req,res)=>{
  const response = await fetch("https://api.openai.com/v1/responses", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model:"gpt-4.1-mini",
      input:req.body.prompt
    })
  });

  const data = await response.json();
  res.json({ result: data.output[0].content[0].text });
});

app.listen(10000, ()=>console.log("Server running"));
