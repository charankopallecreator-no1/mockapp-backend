# 🗺️ PROJECT ARCHITECTURE & FILE MAP

## Visual Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│         EDUCATIONAL PLATFORM FOR JEE/NEET PREPARATION              │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────┐                                         │
│  │   WEB APPLICATION       │                                         │
│  │   (React.js)            │                                         │
│  ├─────────────────────────┤                                         │
│  │ • Admin Panel           │                                         │
│  │ • Student Dashboard     │                                         │
│  │ • Test Interface        │                                         │
│  │ • Theme Toggle (Dark)   │                                         │
│  │ • Responsive Design     │                                         │
│  │ • Service Worker (PWA)  │                                         │
│  └─────────────────────────┘                                         │
│            ↑                                                         │
│            │                                                         │
│                    HTTP REST API (JSON)                               │
│            │                                                         │
└────────────┼─────────────────────────────────────────────────────────┘
                                │
                                ↓
┌──────────────────────────────────────────────────────────────────────┐
│                        API LAYER                                      │
├──────────────────────────────────────────────────────────────────────┤
│              Node.js + Express.js (Port 5000)                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │  /api/auth  │  │ /api/admin  │  │ /api/tests  │  │/api/ai     │ │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤  ├────────────┤ │
│  │ • login     │  │ • create    │  │ • get       │  │ • generate │ │
│  │ • signup    │  │   student   │  │   tests     │  │   question │ │
│  │ • change    │  │ • view all  │  │ • submit    │  │ • evaluate │ │
│  │   password  │  │   students  │  │   answers   │  │   answer   │ │
│  │ • auth      │  │ • update    │  │ • scoring   │  │            │ │
│  │   middleware│  │ • delete    │  │ • anti-cheat│  │            │ │
│  │ • profile   │  │ • performance│ │            │  │            │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │            /api/questions - Question Management              │   │
│  │  • Upload single question  • Create test  • Bulk upload      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────┬──────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ↓               ↓               ↓
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   MongoDB    │ │  OpenAI API  │ │ JWT Service  │
│   Database   │ │  (AI Models) │ │ (Auth Token) │
├──────────────┤ ├──────────────┤ ├──────────────┤
│ • Models     │ │ • Question   │ │ • Token Gen  │
│ • Schemas    │ │   generation │ │ • Validation │
│ • Data store │ │ • Answer     │ │ • Expiry     │
│ • Indexes    │ │   evaluation │ │             │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## 📁 Complete File Structure

```
mockapp/
│
├── 📂 backend/                           (Node.js API Server)
│   ├── server.js                         (Main Express app - 50+ lines)
│   ├── models.js                         (MongoDB schemas - 300+ lines)
│   ├── initAdmin.js                      (Auto admin creation - 30 lines)
│   ├── .env                              (Configuration)
│   ├── package.json
│   ├── node_modules/
│   │
│   └── 📂 routes/
│       ├── auth.js                       (Auth endpoints - 100+ lines)
│       ├── admin.js                      (Admin CRUD - 150+ lines)
│       ├── tests.js                      (Test submission - 120+ lines)
│       ├── questions.js                  (Questions & tests - 140+ lines)
│       └── ai.js                         (AI features - 80+ lines)
│
├── 📂 frontend/                          (Client Applications)
│   │
│   ├── 📂 web/                           (React Web App)
│   │   ├── 📂 src/
│   │   │   ├── App.js                    (Root router - 80 lines)
│   │   │   ├── App.css                   (Root styling)
│   │   │   ├── Login.js                  (Student login - 100 lines)
│   │   │   ├── Login.css
│   │   │   ├── AdminLogin.js             (Admin login - 120 lines)
│   │   │   ├── AdminPanel.js             (Admin dashboard - 280 lines)
│   │   │   ├── Dashboard.js              (Student dashboard - 200 lines)
│   │   │   ├── TestScreen.js             (Test interface - 250 lines)
│   │   │   ├── index.css
│   │   │   ├── serviceWorker.js          (PWA service worker)
│   │   │   ├── serviceWorkerRegistration.js
│   │   │   │
│   │   │   └── 📂 styles/                (Component styles)
│   │   │       ├── AdminPanel.css        (Admin UI styling)
│   │   │       ├── Dashboard.css         (Dashboard styling)
│   │   │       └── TestScreen.css        (Test UI styling)
│   │   │
│   │   ├── 📂 public/
│   │   │   ├── index.html                (HTML entry point)
│   │   │   ├── manifest.json             (PWA manifest)
│   │   │   ├── favicon.ico
│   │   │   └── robots.txt
│   │   │
│   │   └── package.json                  (React dependencies)
│   │
│
├── 📂 ai-service/                        (Python AI Service - Optional)
│   └── app.py                            (Flask/FastAPI placeholder)
│
├── 📂 docs/                              (Documentation)
│   └── API_DOCUMENTATION.md              (API reference)
│
├── 📂 .github/
│   └── copilot-instructions.md           (Setup checklist)
│
├── 📄 README.md                          (Project overview)
├── 📄 QUICK_START.md                     (5-min setup guide) ⭐
├── 📄 COMPLETE_OVERVIEW.md               (This comprehensive guide)
├── 📄 PROJECT_STATUS.md                  (Feature checklist)
├── 📄 ADMIN_SETUP.md                     (Admin guide)
├── 📄 ADMIN_PANEL_COMPLETE.md            (User manual)
│
├── .gitignore                            (Git ignore rules)
├── package.json                          (Root dependencies)
└── package-lock.json
```

---

## 🔄 Data Flow & Relationships

### Authentication Flow
```
User Input (Login/Signup)
    ↓
Login.js / AdminLogin.js (Frontend)
    ↓
POST /api/auth/login
    ↓
backend/routes/auth.js (Validate credentials)
    ↓
Check MongoDB User collection
    ↓
Generate JWT Token
    ↓
Return token + user data
    ↓
Store in localStorage (Frontend)
    ↓
Use token in headers for API calls
```

### Test-Taking Flow
```
Student launches test
    ↓
Dashboard.js → clicks "Start Test"
    ↓
Fetches test details via GET /api/tests/:testId
    ↓
Renders TestScreen.js
    ↓
Student answers questions
    ↓
Tab switch detected? Count increments
    ↓
Student clicks Submit
    ↓
POST /api/tests/submit (with answers & suspicious flags)
    ↓
backend/routes/tests.js (Calculate score)
    ↓
Store Result in MongoDB
    ↓
Return results to frontend
    ↓
Display score, percentage, accuracy
```

### Admin Student Creation Flow
```
Admin fills form in AdminPanel.js
    ↓
POST /api/admin/create-student
    ↓
backend/routes/admin.js validates input
    ↓
Generate unique userId + temporary password
    ↓
Create User document in MongoDB
    ↓
Return password to admin
    ↓
Admin shares with student
    ↓
Student logs in with provided credentials
```

---

## 🛠️ Component Dependencies

### Frontend Component Tree
```
App.js (Root)
├── Login.js
│   └── Axios API calls → /api/auth/login
├── AdminLogin.js
│   └── Axios API calls → /api/auth/login (role: admin)
├── Dashboard.js
│   ├── Theme toggle (localStorage)
│   ├── Progress cards (state-based)
│   ├── Test grid (mapped from tests array)
│   └── TestScreen.js
│       ├── Timer component
│       ├── Question display
│       ├── Options (MCQ)
│       ├── Question navigator
│       └── Tab detection (addEventListener)
└── AdminPanel.js
    ├── Tab: Create Student
    │   └── Form → POST /api/admin/create-student
    ├── Tab: Manage Students
    │   └── GET /api/admin/get-students
    └── Tab: Upload Question
        └── Form → POST /api/questions/upload-question
```

### Backend Middleware Chain
```
Request from Client
    ↓
Express middleware (body parser, etc.)
    ↓
Route handler (/api/auth, /api/admin, etc.)
    ↓
Auth middleware (JWT validation)
    ↓
Admin check middleware (if needed)
    ↓
Business logic (models, database)
    ↓
MongoDB operations (CRUD)
    ↓
Response with data/error
    ↓
Client receives JSON
```

---

## 📊 Data Model Relationships

```
┌────────────┐
│   User     │ (Admin creates these)
├────────────┤
│ userId     │
│ email      │
│ password   │
│ course     │ ────┐
│ examType   │ ─┐  │
│ role       │  │  │
└────────────┘  │  │
       ▲        │  │
       │        │  │
       │        ↓  ↓
       │     ┌─────────────┐
       │     │    Test     │
       │     ├─────────────┤
       │     │ course      │
       │     │ examType    │
       │     │ questions[] │──┐
       │     └─────────────┘  │
       │            ▲          │
       │            │          │
       └────────────┼──────────┤
                    │          │
                    ├──────────┘
                    │
                    ↓
           ┌──────────────────┐
           │    Question      │
           ├──────────────────┤
           │ course           │
           │ examType         │
           │ subject          │
           │ difficulty       │
           │ correctAnswer    │
           │ options[]        │
           └──────────────────┘

       Student takes Test
              │
              ↓
       ┌────────────────┐
       │    Result      │ (Stored per attempt)
       ├────────────────┤
       │ studentId      │
       │ testId         │
       │ answers[]      │
       │ score          │
       │ percentage     │
       │ cheatingDetected│
       │ tabSwitches    │
       └────────────────┘
              │
              ↓
       ┌───────────────┐
       │  Progress     │ (Aggregated)
       ├───────────────┤
       │ studentId     │
       │ subject       │
       │ totalAttempts │
       │ correct       │
       │ percentage    │
       └───────────────┘
```

---

## 🎯 API Endpoint Map

```
┌─────────────────────────────────────────────────────────────┐
│                    REST API ENDPOINTS                       │
├─────────────────────────────────────────────────────────────┤

AUTHENTICATION
├─ POST   /api/auth/login              (Any user login)
├─ POST   /api/auth/signup             (Student self or admin create)
├─ POST   /api/auth/change-password    (Update password)
└─ GET    /api/auth/profile            (Get current user)

ADMIN OPERATIONS (Protected - Admin only)
├─ POST   /api/admin/create-student    (Generate student account)
├─ GET    /api/admin/get-students      (List all students)
├─ PUT    /api/admin/update-student/:id (Modify student)
├─ DELETE /api/admin/delete-student/:id (Remove student)
└─ GET    /api/admin/performance       (Get analytics)

TESTS (Protected - Authenticated users)
├─ GET    /api/tests/tests-by-course/:course (Available tests)
├─ GET    /api/tests/:testId           (Test details)
├─ POST   /api/tests/submit            (Submit & score)
├─ GET    /api/tests/results/:studentId (Past results)
└─ GET    /api/tests/review/:resultId  (Review submission)

QUESTIONS (Protected - Admin can post)
├─ POST   /api/questions/upload-question   (Single Q)
├─ POST   /api/questions/bulk-upload       (Multiple Q)
├─ GET    /api/questions/by-course/:course (Filter Q)
└─ POST   /api/questions/create-test       (Make test from Q)

AI FEATURES (Protected)
├─ POST   /api/ai/generate-question    (Create MCQ)
└─ POST   /api/ai/evaluate-answer      (Grade answer)
```

---

## 🔐 Authentication & Authorization Layers

```
┌─────────────────────────────────────────┐
│         Authentication Flow              │
├─────────────────────────────────────────┤

1. LOGIN
   User submits: { userId/email, password }
   ↓
   Backend validates against MongoDB User
   ↓
   Match found?
   ├─ Yes: Create JWT token (expires 7 days)
   │       Return: { token, user }
   └─ No:  Return 401 Unauthorized

2. TOKEN STORAGE
   Frontend stores JWT in localStorage
   Included in all API requests:
   Headers: { Authorization: "Bearer <token>" }

3. ROUTE PROTECTION
   Middleware checks token validity
   ├─ Valid? Continue to handler
   └─ Invalid? Return 401

4. AUTHORIZATION
   Role check:
   ├─ Admin role? Can access /api/admin/*
   └─ Student role? Can access /api/tests/*

5. LOGOUT
   Frontend deletes token from localStorage
   No server-side session cleanup needed (stateless)
```

---

## 🎨 UI Component Hierarchy

```
Index.html
│
└─ App.js (Root Component)
   │
   ├─ Mode Toggle Button (Top-right)
   │
   └─ Router/States
      │
      ├─ (If not logged in)
      │  ├─ Login Mode Toggle: [Student] [Admin]
      │  ├─ Login.js (Student login form)
      │  └─ AdminLogin.js (Admin login form)
      │
      └─ (If logged in)
         │
         ├─ (If Admin)
         │  └─ AdminPanel.js
         │     ├─ Tab 1: Create Student
         │     │  └─ Form with validation
         │     ├─ Tab 2: Manage Students
         │     │  └─ Table with delete buttons
         │     └─ Tab 3: Upload Question
         │        └─ Form with options
         │
         └─ (If Student)
            └─ Dashboard.js
               ├─ Header: Name, Logout, Theme toggle
               ├─ Progress Cards (4 subjects)
               │  └─ Each shows: Score%, Accuracy%
               ├─ Available Tests Grid
               │  └─ Click "Start Test" button
               └─ TestScreen.js (When test started)
                  ├─ Header: Timer, Tab Count
                  ├─ Left: Question Display
                  │  └─ Options (MCQ)
                  ├─ Right: Question Shortcut Panel
                  │  └─ Click to jump
                  └─ Footer: Previous/Next/Submit
```

---

## ⚙️ Configuration & Environment

### .env File (Backend)
```
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# API Keys
OPENAI_API_KEY=sk-...

# JWT
JWT_SECRET=your-secret-key

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Environment-Specific Configurations
```
Development:
├─ MONGODB_URI → Local or dev cluster
├─ OPENAI_API_KEY → Dev API key
├─ NODE_ENV=development
└─ CORS_ORIGIN=http://localhost:3000

Production:
├─ MONGODB_URI → Production cluster
├─ OPENAI_API_KEY → Production key
├─ NODE_ENV=production
├─ PORT=80 or managed by cloud
└─ CORS_ORIGIN=https://yourdomain.com
```

---

## 📈 Scalability Considerations

```
Current Setup (Demo):
├─ Single Node.js server
├─ Single MongoDB instance
└─ Single API endpoint

Future Scaling:
├─ Load balancer (Nginx/AWS ELB)
├─ Multiple API server instances
├─ Database replication
├─ Caching layer (Redis)
├─ CDN for static files
├─ Microservices (separate AI service)
└─ Database sharding for millions of records
```

---

## 🔍 Performance Optimization Tips

```
Frontend:
├─ Code splitting (lazy load TestScreen)
├─ Image optimization
├─ CSS minification
├─ Service worker caching
└─ Reduce API calls

Backend:
├─ Database indexing (userId, testId)
├─ API response pagination
├─ Gzip compression
├─ Connection pooling
└─ Query optimization
```

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] Admin can login
- [ ] Admin can create students
- [ ] Admin can upload questions
- [ ] Student can login
- [ ] Test scoring is accurate
- [ ] Cheating detection works
- [ ] Tab switching is counted
- [ ] Timer works correctly
- [ ] Results persist
- [ ] Dark mode toggles

### Security Testing
- [ ] Invalid login rejected
- [ ] JWT token validates
- [ ] Admin-only routes protected
- [ ] Student isolation (can't see others' data)
- [ ] Passwords hashed
- [ ] No API data leakage

### Performance Testing
- [ ] API responds < 2 seconds
- [ ] Page loads < 3 seconds
- [ ] Web responsive for all screen sizes
- [ ] Dark mode loads quickly

### Integration Testing
- [ ] Frontend connects to backend
- [ ] Backend connects to MongoDB
- [ ] OpenAI API calls work
- [ ] Service worker syncs offline

---

**Complete project architecture & reference map created!** 🗺️

See QUICK_START.md to begin working with the platform.