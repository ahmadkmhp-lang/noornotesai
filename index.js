import express from "express";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static("public"));

// AI API
app.post('/ai', async (req, res) => {
  const { text } = req.body;
  res.json({ message: "AI Response: " + text });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
