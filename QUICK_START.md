# 🚀 QUICK START GUIDE

## Get Running in 5 Minutes

### Prerequisites Check
- Node.js installed? (v16+)
- MongoDB connection ready? (Connection string in `.env`)
- OpenAI API key ready? (In `.env`)

---

## Step 1: Start Backend (2 mins)

```bash
cd backend
npm install
npm start
```

**What to expect:**
```
✨ Admin user created successfully
Admin ID: admin123
Password: Admin@12345
🚀 Server running on http://localhost:5000
```

💾 **Copy these credentials immediately!** You'll need them to login.

---

## Step 2: Start Frontend (2 mins)

```bash
cd frontend/web
npm install
npm start
```

**What to expect:**
- Browser opens automatically to `http://localhost:3000`
- You see the platform homepage with login options

---

## Step 3: Login & Explore (1 min)

### As Admin:
1. Click **"Admin Login"** button
2. Enter:
   - ID: `admin123`
   - Password: `Admin@12345`
3. You're in the admin panel!

### Admin Panel Tabs:
- **Create Student**: Make new student accounts
- **Manage Students**: View and delete students
- **Upload Questions**: Add questions to question bank

---

## Step 4: Create Your First Student

In Admin Panel → "Create Student" tab:

```
Name: Rohit Kumar
Phone: 9876543210
Course: MPC (Math, Physics, Chemistry)
Year: 2024
Exam Type: JEE Mains
```

→ Click **"Create Student"** → Note the password shown

---

## Step 5: Upload a Sample Question

In Admin Panel → "Upload Question" tab:

```
Question: What is the SI unit of Force?
Option A: Newton
Option B: Pascal  ← (Select as correct)
Option C: Joule
Option D: Watt
Subject: Physics
Difficulty: Easy
Course: MPC
```

→ Click **"Upload Question"** → Done!

---

## Step 6: Test as Student

1. Logout from admin (click student icon)
2. Click **"Student Login"**
3. Use the credentials you got when creating the student
4. Go to **"Available Tests"**
5. Click **"Start Test"**

**You'll see:**
- Timer counting down
- Question with 4 options
- Question navigator panel
- Submit button

---

## 🎮 Try the Anti-Cheating Detection

While in a test, try:
- Switch to another tab (Alt+Tab or click browser tab)
- Notice: **"Tab switches: 1"** appears
- Switch again: "Tab switches: 2"
- After 3 switches: Auto-submit with cheating flag

---

## 🌙 Dark Mode Toggle

In Student Dashboard:
- Look for **☀️ / 🌙** button (top right)
- Click to toggle between light and dark mode
- Your preference is saved automatically

---

## 📊 View Results

After submitting a test:
- See your **Score**, **Percentage**, **Accuracy**
- If cheating was detected: Shows **"⚠️ Suspicious Activity"**
- Overall performance shown in Dashboard progress cards

---

## 🛠️ Troubleshooting

### Backend won't start?
```
Error: Cannot find module 'express'
→ Solution: Delete node_modules folder, run npm install again
```

### Frontend won't start?
```
Error: ENOENT: no such file or directory
→ Solution: Make sure you're in frontend/web folder, not just frontend/
```

### Login fails?
```
Error: 401 Unauthorized
→ Solution: Check backend is running on port 5000
            Verify ID and password are exactly correct
```

### MongoDB connection error?
```
Error: MongooseError: Cannot connect
→ Solution: Check .env file has correct database URI
            Verify internet connection (Atlas needs online)
            Check IP whitelist in MongoDB Atlas
```

### Questions not appearing?
```
→ Solution: Course in question must match student's course
            Make sure question is uploaded, not just draft
```

---

##  Changing Admin Password

⚠️ **IMPORTANT**: Change this before going to production!

1. Open `backend/initAdmin.js`
2. Find these lines:
   ```javascript
   const userId = 'admin123';
   const password = 'Admin@12345';
   ```
3. Change to your desired credentials:
   ```javascript
   const userId = 'your_new_id';      // e.g., 'superadmin'
   const password = 'Your@Secure123'; // Make it strong!
   ```
4. Delete MongoDB admin user (so it recreates with new password)
5. Restart backend server (`npm start`)

---

## 📚 Complete Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview & architecture |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Feature completeness & status |
| [ADMIN_SETUP.md](ADMIN_SETUP.md) | Admin features & API endpoints |
| [ADMIN_PANEL_COMPLETE.md](ADMIN_PANEL_COMPLETE.md) | Complete user guide |

---

## 💡 Tips & Tricks

### Keyboard Shortcuts in Test:
- **Q** → Go to first question
- **Ctrl+S** → Submit test
- **Arrow Keys** → Next/Previous question

### Question Navigator:
- **Green** = Answered
- **Blue** = Current question
- **Gray** = Not answered
Click any to jump directly

### Admin Panel Tips:
- Create test students with consistent naming (batch wise)
- Upload questions in bulk from spreadsheet
- Use filters by course/exam type when viewing tests

---

## 🎯 Common Workflows

### Workflow 1: Set Up Your First Exam
1. **Admin Login**
2. **Create 5 Students** (Create Student tab)
3. **Upload 10 Questions** (Upload Question tab)
4. **Create a Test** (future feature: Questions tab will have test creation)
5. **Share credentials** with students

### Workflow 2: Monitor Student Progress
1. **Admin Login**
2. **Go to Manage Students** tab
3. View all created students
4. Check each student's performance data (backend endpoint)
5. Delete if needed

### Workflow 3: Student Takes Test
1. **Student Login** with provided ID
2. **Dashboard** shows available tests
3. **Click Start Test**
4. **Answer all questions** (MCQ format)
5. **Click Submit** when done
6. **View Results** immediately

---

## 🔗 Important URLs

| Component | URL |
|-----------|-----|
| Web Frontend | http://localhost:3000 |
| Backend Server | http://localhost:5000 |
| MongoDB | mongodb+srv://... (in .env) |

---

## 📞 Need Help?

1. **Check Error Message** - Read the console output carefully
2. **Review Logs** - Backend console shows all API calls
3. **Read Documentation** - Link to guides above
4. **Check Connection** - Ensure all services (backend, MongoDB) are running

---

## ✅ Checklist for Launch

- [ ] Backend running (http://localhost:5000 works)
- [ ] Frontend running (http://localhost:3000 works)
- [ ] Admin login works (admin123 / Admin@12345)
- [ ] Can create a student
- [ ] Can upload a question
- [ ] Can login as student
- [ ] Can take a test
- [ ] Can see results
- [ ] Dark mode toggle works
- [ ] Tab switch detection works

---

**🎉 You're All Set!**

Start with Step 1, follow through Step 6, and you'll have a fully working platform in minutes.

Happy learning! 📚✨