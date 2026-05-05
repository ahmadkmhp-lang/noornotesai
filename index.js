const express = require("express");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// AI route
app.post("/ai", async (req, res) => {
  const text = req.body.text;
  res.json({ response: "AI response: " + text });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running 🚀"));
