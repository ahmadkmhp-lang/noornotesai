
const express = require("express");
const app = express();

app.use(express.json());

// AI route
app.post("/ai", (req, res) => {
  const text = req.body.text;

  res.json({
    result: "AI response: " + text
  });
});

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(3000, () => {
  console.log("Server running 🚀");
});
