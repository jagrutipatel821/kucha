// Test MongoDB connection
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load .env.local if it exists
let MONGODB_URI = 'mongodb://localhost:27017/kucha-enterprises';

try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const uriMatch = envContent.match(/MONGODB_URI=(.+)/);
    if (uriMatch) {
      MONGODB_URI = uriMatch[1].trim();
    }
  }
} catch (error) {
  console.log('⚠️  Could not read .env.local, using default MongoDB URI');
}

// Override with environment variable if set
MONGODB_URI = process.env.MONGODB_URI || MONGODB_URI;

async function testConnection() {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    console.log(`📍 URI: ${MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`); // Hide password
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🔗 Ready State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    if (collections.length > 0) {
      console.log('   Collections:', collections.map(c => c.name).join(', '));
    }
    
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\n💡 Troubleshooting tips:');
    console.error('   1. Make sure MongoDB is running (mongod command or MongoDB service)');
    console.error('   2. Check your MONGODB_URI in .env.local file');
    console.error('   3. For local MongoDB, ensure it\'s on default port 27017');
    console.error('   4. For MongoDB Atlas, check your IP whitelist and credentials');
    process.exit(1);
  }
}

testConnection();

