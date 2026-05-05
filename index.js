import express from "express";

const app = express();

app.use(express.json());

// AI API
app.post('/ai', async (req, res) => {
  res.json({ message: "AI working 🚀" });
});

// Home route
app.get('/', (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
