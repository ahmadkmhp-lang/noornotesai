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

    // SAFE parsing
    let result = "AI error ❌";

    if (data && data.output && data.output[0] && data.output[0].content) {
      result = data.output[0].content[0].text;
    }

    res.json({ result });

  } catch (err) {
    console.log(err);
    res.json({ result: "Server error ❌" });
  }
});
