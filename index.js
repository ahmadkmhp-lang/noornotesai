const express = require("express");
const app = express();

app.use(express.json());

// TEST route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// AI route
app.post("/ai", (req, res) => {
  const { text } = req.body;

  res.json({
    result: "AI response: " + text
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
