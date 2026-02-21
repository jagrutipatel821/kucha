/**
 * Create an admin user. Does not delete existing data.
 * Usage: node scripts/create-admin.js
 * Or:    npm run create:admin
 *
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to customize (optional).
 * Default: admin@kucha.com / admin123
 */

const path = require('path');
const fs = require('fs');

// Load .env.local if it exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  });
}

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@kucha.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kucha-enterprises';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.role === 'admin') {
        console.log('Admin user already exists:', email);
        console.log('To reset password, delete the user first or use a different email.');
        return;
      }
      // Upgrade existing user to admin
      const hashedPassword = await bcrypt.hash(password, 12);
      existing.password = hashedPassword;
      existing.role = 'admin';
      existing.isActive = true;
      await existing.save();
      console.log('Upgraded existing user to admin:', email);
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      });
      console.log('Admin user created successfully:', email);
    }

    console.log('\nLogin credentials:');
    console.log('  Email:', email);
    console.log('  Password:', password);
    console.log('\nAdmin Secret Key: Use the value of ADMIN_REGISTRATION_KEY from .env.local');
    console.log('  (e.g. ADMIN_REGISTRATION_KEY=kucha-admin-2024-secure-key)');
  } catch (err) {
    console.error('Error:', err.message);
    if (err.code === 11000) {
      console.error('A user with this email already exists.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

createAdmin();
