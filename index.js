
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

// Schema
const Note = mongoose.model("Note", new mongoose.Schema({
  text:String
}));

// Save
app.post("/save", async (req,res)=>{
  const note = new Note({ text:req.body.note });
  await note.save();
  res.json({ success:true });
});

// Get
app.get("/notes", async (req,res)=>{
  const notes = await Note.find();
  res.json(notes);
});

// AI (simple version without fetch error)
app.post("/ai", async (req,res)=>{
  res.json({ result: "AI working soon 🚀" });
});

app.listen(10000, ()=>console.log("Server running"));
