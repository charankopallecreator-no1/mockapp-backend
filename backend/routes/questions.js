const express = require('express');
const { Test, Question } = require('../models');

const router = express.Router();

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// Upload question
router.post('/upload-question', auth, adminOnly, async (req, res) => {
  try {
    const { questionText, options, correctAnswer, type, subject, topic, difficulty, explanation, marks, course, examType } = req.body;

    const question = new Question({
      questionText,
      options,
      correctAnswer,
      type,
      subject,
      topic,
      difficulty,
      explanation,
      marks,
      course,
      examType,
      createdBy: req.user.id,
    });

    await question.save();
    res.status(201).json({ message: 'Question uploaded successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload multiple questions (CSV/JSON)
router.post('/upload-questions-bulk', auth, adminOnly, async (req, res) => {
  try {
    const { questions } = req.body; // Array of questions
    const questionsWithAdmin = questions.map(q => ({
      ...q,
      createdBy: req.user.id,
    }));

    const insertedQuestions = await Question.insertMany(questionsWithAdmin);
    res.status(201).json({ message: 'Questions uploaded successfully', count: insertedQuestions.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get questions by course and exam type
router.get('/questions', auth, adminOnly, async (req, res) => {
  try {
    const { course, examType, subject } = req.query;
    const filter = {};
    if (course) filter.course = course;
    if (examType) filter.examType = examType;
    if (subject) filter.subject = subject;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create test
router.post('/create-test', auth, adminOnly, async (req, res) => {
  try {
    const { title, description, type, subject, examType, questions, duration, totalMarks, course, negativeMarking } = req.body;

    const test = new Test({
      title,
      description,
      type,
      subject,
      examType,
      questions,
      duration,
      totalMarks,
      course,
      negativeMarking: negativeMarking || 0.25,
      createdBy: req.user.id,
    });

    await test.save();
    res.status(201).json({ message: 'Test created successfully', test });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;