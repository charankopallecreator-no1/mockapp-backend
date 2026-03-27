const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  dateOfBirth: { type: Date },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  // Student-specific fields
  course: { type: String, enum: ['MPC', 'BiPC', 'others'], },
  yearOfStudy: { type: Number }, // 1, 2, 3, etc.
  examType: { type: String, enum: ['EAMCET', 'JEE-Mains', 'JEE-Advanced', 'NEET'], },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  profile: {
    avatar: String,
    bio: String,
  },
  preferences: {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    notifications: { type: Boolean, default: true },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who created this student
});

// Test Schema
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['full-length', 'section-wise'], required: true },
  subject: { type: String, enum: ['physics', 'chemistry', 'math', 'biology'], required: true },
  examType: { type: String, enum: ['jee-mains', 'jee-advanced', 'neet'], required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  duration: { type: Number, required: true }, // in minutes
  totalMarks: { type: Number, required: true },
  negativeMarking: { type: Number, default: 0.25 }, // for MCQ
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// Question Schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String }], // for MCQ
  correctAnswer: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'integer', 'assertion-reason'], required: true },
  subject: { type: String, enum: ['physics', 'chemistry', 'math', 'biology'], required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  explanation: String,
  marks: { type: Number, default: 4 },
  course: { type: String, enum: ['MPC', 'BiPC', 'others'], }, // For course-specific questions
  examType: { type: String, enum: ['EAMCET', 'JEE-Mains', 'JEE-Advanced', 'NEET'], },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

// Result Schema
const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer: String,
    isCorrect: Boolean,
    timeTaken: Number, // in seconds
  }],
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  percentage: { type: Number },
  rank: { type: Number },
  percentile: { type: Number },
  accuracy: { type: Number }, // percentage
  isCheatingDetected: { type: Boolean, default: false },
  tabSwitches: { type: Number, default: 0 },
  subjectWise: {
    physics: { score: Number, accuracy: Number },
    chemistry: { score: Number, accuracy: Number },
    math: { score: Number, accuracy: Number },
    biology: { score: Number, accuracy: Number },
  },
  timeTaken: { type: Number }, // total time in seconds
  submittedAt: { type: Date, default: Date.now },
});

// Progress Schema
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, enum: ['physics', 'chemistry', 'math', 'biology'], required: true },
  topic: { type: String, required: true },
  completedQuestions: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in minutes
  lastUpdated: { type: Date, default: Date.now },
});

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subject: { type: String, enum: ['physics', 'chemistry', 'math', 'biology'], required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// Achievement Schema
const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['badge', 'medal', 'streak'], required: true },
  title: { type: String, required: true },
  description: String,
  icon: String,
  unlockedAt: { type: Date, default: Date.now },
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: String,
  type: { type: String, enum: ['test', 'assignment', 'result', 'general'], default: 'general' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Test: mongoose.model('Test', testSchema),
  Question: mongoose.model('Question', questionSchema),
  Result: mongoose.model('Result', resultSchema),
  Progress: mongoose.model('Progress', progressSchema),
  Assignment: mongoose.model('Assignment', assignmentSchema),
  Achievement: mongoose.model('Achievement', achievementSchema),
  Notification: mongoose.model('Notification', notificationSchema),
};