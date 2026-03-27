// Initialize default admin on server startup
const bcrypt = require('bcryptjs');
const { User } = require('./models');

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ userId: 'admin123' });
    if (existingAdmin) {
      console.log('✅ Admin account already exists');
      return;
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash('Admin@12345', 10);
    const admin = new User({
      userId: 'admin123',
      name: 'Administrator',
      email: 'admin@platform.local',
      phone: '+1234567890',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Default admin created successfully');
    console.log('   Admin ID: admin123');
    console.log('   Password: Admin@12345');
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  }
}

module.exports = createDefaultAdmin;