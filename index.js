const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/ai", async (req, res) => {

  const prompt = req.body.prompt;

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates[0].content.parts[0].text;

    res.json({
      reply: reply,
    });

  } catch (error) {

    console.log(error);

    res.json({
      reply: "Error getting AI response",
    });

  }

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});
