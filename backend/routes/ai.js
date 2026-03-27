const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const router = express.Router();

// Generate question
router.post('/generate-question', async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    const prompt = `Generate a ${difficulty} level multiple-choice question on ${topic} for JEE/NEET preparation. Include 4 options and the correct answer.`;

    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 300,
    });

    const generated = response.choices[0].text.trim();
    res.json({ question: generated });
  } catch (error) {
    res.status(500).json({ message: 'AI generation failed', error: error.message });
  }
});

// Evaluate answer
router.post('/evaluate-answer', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const prompt = `Evaluate the student's answer "${answer}" for the question "${question}". Provide a score out of 4, detailed feedback, and if incorrect, the correct answer.`;

    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 300,
    });

    const evaluation = response.choices[0].text.trim();
    // Parse score - placeholder
    const score = 3; // Extract from response if possible
    res.json({ evaluation, score });
  } catch (error) {
    res.status(500).json({ message: 'AI evaluation failed', error: error.message });
  }
});

module.exports = router;