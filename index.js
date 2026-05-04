const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Noor Notes AI running 🚀");
});

app.listen(3000, () => {
  console.log("Server running");
});
