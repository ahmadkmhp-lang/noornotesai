app.post("/ai", async (req,res)=>{
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: req.body.prompt
      })
    });

    const data = await response.json();

    res.json({
      result: data.output[0].content[0].text
    });

  } catch (err) {
    res.json({ result: "Error in AI ❌" });
  }
});
