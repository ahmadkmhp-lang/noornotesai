const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 10000;

// 👇 static folder serve करेगा
app.use(express.static("public"));

// 👇 main route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
