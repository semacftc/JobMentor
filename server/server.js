const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { generateCVPrompt, generateInterviewPrompt } = require("../utils/prompts");
const { GeminiAPI } = require("./gemini");

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post("/cv", async (req, res) => {
  const prompt = generateCVPrompt(req.body.userInput);
  const result = await GeminiAPI(prompt);
  res.json({ result });
});

app.post("/interview", async (req, res) => {
  const prompt = generateInterviewPrompt(req.body.userInput);
  const questions = await GeminiAPI(prompt);
  res.json({ questions });
});

app.post("/evaluate", async (req, res) => {
  const prompt = `Aşağıdaki mülakat cevabını değerlendir. Güçlü yanlarını, eksiklerini ve önerilerini belirt. Cevap: ${req.body.answer}`;
  const feedback = await GeminiAPI(prompt);
  res.json({ feedback });
});

app.listen(3000, () => console.log("JobMentor API çalışıyor"));
