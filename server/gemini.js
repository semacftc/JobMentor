const axios = require("axios");

async function GeminiAPI(prompt) {
  try {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY }
      }
    );
    return res.data.candidates[0].content.parts[0].text;
  } catch (e) {
    console.error("Gemini hatası:", e);
    return "Bir hata oluştu.";
  }
}

module.exports = { GeminiAPI };
