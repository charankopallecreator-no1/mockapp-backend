const express = require('express');
const { Test, Question, Result } = require('../models');

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

// Get all tests for student's course
router.get('/', auth, async (req, res) => {
  try {
    const { User } = require('../models');
    const student = await User.findById(req.user.id);
    const tests = await Test.find({
      isActive: true,
      $or: [{ course: student.course }, { course: { $exists: false } }],
    }).populate('questions');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions');
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit test result with anti-cheating detection
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { answers, isCheatingDetected, tabSwitches } = req.body;
    const test = await Test.findById(req.params.id).populate('questions');
    if (!test) return res.status(404).json({ message: 'Test not found' });

    // Flag if cheating detected
    if (isCheatingDetected || (tabSwitches && tabSwitches > 3)) {
      const result = new Result({
        user: req.user.id,
        test: test._id,
        score: 0,
        totalMarks: test.totalMarks,
        percentage: 0,
        accuracy: 0,
        isCheatingDetected: true,
        tabSwitches: tabSwitches || 0,
      });
      await result.save();
      return res.status(400).json({ message: 'Cheating detected. Test submission rejected.', result });
    }

    let score = 0;
    let correctCount = 0;
    const evaluatedAnswers = [];

    for (const ans of answers) {
      const question = test.questions.find(q => q._id.toString() === ans.questionId);
      if (question) {
        const isCorrect = question.correctAnswer === ans.answer;
        if (isCorrect) {
          score += question.marks;
          correctCount++;
        } else if (test.negativeMarking > 0) {
          score -= test.negativeMarking;
        }
        evaluatedAnswers.push({
          question: question._id,
          answer: ans.answer,
          isCorrect,
          timeTaken: ans.timeTaken || 0,
        });
      }
    }

    const percentage = (score / test.totalMarks) * 100;
    const accuracy = (correctCount / answers.length) * 100;

    const result = new Result({
      user: req.user.id,
      test: test._id,
      answers: evaluatedAnswers,
      score,
      totalMarks: test.totalMarks,
      percentage,
      accuracy,
      tabSwitches: tabSwitches || 0,
    });

    await result.save();

    res.json({ result, score, percentage, accuracy });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;