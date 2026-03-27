const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

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

// Create new student
router.post('/create-student', auth, adminOnly, async (req, res) => {
  try {
    const { userId, name, phone, course, yearOfStudy, examType } = req.body;

    // Check if userId already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) return res.status(400).json({ message: 'User ID already exists' });

    // Generate random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      userId,
      name,
      phone,
      password: hashedPassword,
      role: 'student',
      course,
      yearOfStudy,
      examType,
      createdBy: req.user.id,
    });

    await newStudent.save();

    res.status(201).json({
      message: 'Student created successfully',
      userId,
      temporaryPassword: password,
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all students
router.get('/students', auth, adminOnly, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student by ID
router.get('/students/:userId', auth, adminOnly, async (req, res) => {
  try {
    const student = await User.findOne({ userId: req.params.userId }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update student
router.put('/students/:userId', auth, adminOnly, async (req, res) => {
  try {
    const student = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    ).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete student
router.delete('/students/:userId', auth, adminOnly, async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student performance
router.get('/performance/:userId', auth, adminOnly, async (req, res) => {
  try {
    const { Result } = require('../models');
    const results = await Result.find({ user: req.params.userId }).populate('test');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;