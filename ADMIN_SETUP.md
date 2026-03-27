# Admin Panel Setup Guide

## Admin Credentials

**Admin ID:** `admin123`
**Admin Password:** `Admin@12345`

## Admin Features

### 1. Student Management
- Create new students with unique IDs
- System generates temporary passwords automatically
- Manage student information:
  - Name, Phone, Year of Study
  - Course: MPC (Math-Physics-Chemistry) or BiPC (Biology-Physics-Chemistry)
  - Exam Type: EAMCET, JEE Mains, JEE Advanced, or NEET
- View all students and their performance
- Delete students from system

### 2. Question Management
- Upload single questions with:
  - MCQ options
  - Correct answer
  - Subject (Physics, Chemistry, Math, Biology)
  - Difficulty level (Easy, Medium, Hard)
  - Course-specific questions (MPC/BiPC)
  - Exam type selection
- Bulk upload questions via JSON

### 3. Test Management
- Create tests with specific parameters:
  - Subject-wise tests
  - Full-length and section-wise tests
  - MCQ format similar to JEE exams
  - Negative marking logic
  - Course-specific tests

### 4. Performance Monitoring
- Track student performance
- View accuracy and scores
- Monitor tab switching during tests
- Identify cheating attempts

## Student Features

### Login
- Students can only log in with ID and password provided by admin
- Cannot self-register

### Taking Tests
- MCQ-based tests matching JEE pattern
- Timer with auto-submit
- Negative marking applied
- Anti-cheating detection:
  - Tab switching detection (flags after 3 switches)
  - Background app monitoring
  - Question shortcut navigation

### Progress Tracking
- Subject-wise performance analytics
- Accuracy metrics
- Score progression
- Daily/Weekly stats

### Dark Mode
- Toggle between light and dark themes
- Student-friendly UI with matte finish
- Responsive design for all devices

## Course-Specific Content

### For MPC Students
- Questions from: Physics, Chemistry, Math
- Exam options: EAMCET, JEE Mains, JEE Advanced

### For BiPC Students
- Questions from: Physics, Chemistry, Biology
- Exam options: EAMCET, NEET

## Anti-Cheating Measures
1. Tab Switch Detection: Warns user after 3 switches, blocks after detection
2. Fullscreen Mode: Forces fullscreen during tests
3. Background App Blocking: Monitors active window changes
4. Test Invalidation: Marks test as suspicious if cheating detected

## Getting Started

1. **Admin Login**: Click "Admin Login" button on login screen
2. **Create Students**: Go to "Create Student" tab and add student details
3. **Upload Questions**: Use "Upload Question" tab to add exam questions
4. **Monitor Performance**: View student statistics in admin dashboard

## Technical Details

- Backend: Node.js + Express + MongoDB
- Frontend: React + PWA (Progressive Web App)
- Database: MongoDB Atlas
- Authentication: JWT tokens
- API Base: `http://localhost:5000/api`

## Endpoints

### Admin Endpoints
- `POST /api/admin/create-student` - Create new student
- `GET /api/admin/students` - Get all students
- `DELETE /api/admin/students/:userId` - Delete student
- `GET /api/admin/performance/:userId` - Get student performance

### Question Endpoints
- `POST /api/questions/upload-question` - Upload single question
- `POST /api/questions/upload-questions-bulk` - Bulk upload
- `GET /api/questions` - Get questions by filter

### Test Endpoints
- `GET /api/tests` - Get student's tests
- `POST /api/tests/:id/submit` - Submit test with anti-cheating data