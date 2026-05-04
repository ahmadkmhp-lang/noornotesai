const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 10000;

app.post("/api/notes", async (req, res) => {
  const userText = req.body.text;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate short study notes." },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });

  } catch (error) {
    res.json({ result: "Error generating notes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
