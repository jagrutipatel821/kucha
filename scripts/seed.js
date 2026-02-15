const mongoose = require('mongoose');

// Define schemas
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  adminKey: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  image: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// Seed data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kucha-enterprises');

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create demo admin user
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@kucha.com',
      password: hashedPassword,
      role: 'admin',
      adminKey: 'ADMIN123',
      isActive: true
    });
    await adminUser.save();

    // Create demo regular user
    const userPassword = await bcrypt.hash('user123', 12);
    const regularUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@kucha.com',
      password: userPassword,
      role: 'user',
      isActive: true
    });
    await regularUser.save();

    // Create categories
    const categories = [
      {
        name: 'Technology',
        description: 'Advanced technology solutions and tools',
        status: 'active',
        productCount: 0
      },
      {
        name: 'Analytics',
        description: 'Data analytics and business intelligence tools',
        status: 'active',
        productCount: 0
      },
      {
        name: 'Cloud',
        description: 'Cloud computing and infrastructure solutions',
        status: 'active',
        productCount: 0
      },
      {
        name: 'Security',
        description: 'Cybersecurity and data protection tools',
        status: 'active',
        productCount: 0
      },
      {
        name: 'Development',
        description: 'Software development tools and frameworks',
        status: 'active',
        productCount: 0
      },
      {
        name: 'AI/ML',
        description: 'Artificial Intelligence and Machine Learning solutions',
        status: 'active',
        productCount: 0
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories:', createdCategories.length);

    // Create products
    const products = [
      {
        name: 'Premium Tech Solution',
        description: 'Advanced technology solution for modern businesses',
        price: 299.99,
        category: 'Technology',
        stock: 50,
        image: '/api/placeholder/300/200',
        featured: true,
        status: 'active'
      },
      {
        name: 'Business Analytics Suite',
        description: 'Comprehensive analytics tools for data-driven decisions',
        price: 499.99,
        category: 'Analytics',
        stock: 30,
        image: '/api/placeholder/300/200',
        featured: true,
        status: 'active'
      },
      {
        name: 'Cloud Infrastructure Package',
        description: 'Scalable cloud solutions for growing businesses',
        price: 799.99,
        category: 'Cloud',
        stock: 25,
        image: '/api/placeholder/300/200',
        featured: false,
        status: 'active'
      },
      {
        name: 'Security & Compliance Tool',
        description: 'Enterprise-grade security solutions',
        price: 599.99,
        category: 'Security',
        stock: 40,
        image: '/api/placeholder/300/200',
        featured: false,
        status: 'active'
      },
      {
        name: 'Mobile App Development Kit',
        description: 'Complete toolkit for mobile application development',
        price: 399.99,
        category: 'Development',
        stock: 35,
        image: '/api/placeholder/300/200',
        featured: true,
        status: 'active'
      },
      {
        name: 'AI & Machine Learning Platform',
        description: 'Cutting-edge AI tools for business automation',
        price: 999.99,
        category: 'AI/ML',
        stock: 20,
        image: '/api/placeholder/300/200',
        featured: true,
        status: 'active'
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log('Created products:', createdProducts.length);

    // Update category product counts
    for (const product of createdProducts) {
      await Category.findOneAndUpdate(
        { name: product.category },
        { $inc: { productCount: 1 } }
      );
    }

    console.log('Database seeded successfully!');
    console.log('Demo credentials:');
    console.log('Admin: admin@kucha.com / admin123');
    console.log('User: user@kucha.com / user123');
    console.log('Admin registration key: ADMIN123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();

