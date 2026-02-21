/**
 * Writes admin user data to admin-user.json with a properly hashed password.
 * Usage: node scripts/write-admin-json.js
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const email = process.env.ADMIN_EMAIL || 'admin@kucha.com';
const password = process.env.ADMIN_PASSWORD || 'admin123';

const hashedPassword = bcrypt.hashSync(password, 10);

const adminUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: email.toLowerCase(),
  password: hashedPassword,
  role: 'admin',
  isActive: true,
};

const outputPath = path.join(__dirname, 'admin-user.json');
fs.writeFileSync(outputPath, JSON.stringify(adminUser, null, 2), 'utf8');

console.log('Written to scripts/admin-user.json');
console.log('Email:', email);
console.log('Password:', password);
console.log('\nTo import into MongoDB:');
console.log('  mongoimport --uri="YOUR_MONGODB_URI" --db=kucha-enterprises --collection=users --file=scripts/admin-user.json');
