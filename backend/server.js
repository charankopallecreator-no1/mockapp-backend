const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const createDefaultAdmin = require('./initAdmin');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  createDefaultAdmin();
})
.catch(err => console.log(err));

// Routes
const { router: authRoutes } = require('./routes/auth');
const testRoutes = require('./routes/tests');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');
const questionsRoutes = require('./routes/questions');

app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/questions', questionsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Educational Platform API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log('\n=== ADMIN CREDENTIALS ===');
  console.log('Admin ID: admin123');
  console.log('Admin Password: Admin@12345');
  console.log('========================\n');
});