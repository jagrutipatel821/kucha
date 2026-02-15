const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load .env.local if it exists
try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    });
  }
} catch (error) {
  console.log('⚠️  Could not read .env.local, using default MongoDB URI');
}

// Product catalog data
const productCatalog = {
  "company": "Kucha Enterprise",
  "products": [
    {
      "category": "Hydraulic Fittings",
      "items": [
        "Connectors",
        "Union",
        "Elbow",
        "Nipple",
        "Ferrol",
        "Ferrol Nuts in Brass",
        "Ferrol Nuts in S.S.",
        "Ferrol Nuts in C.S."
      ]
    },
    {
      "category": "Pipe Fittings",
      "items": [
        "M.S. Pipe",
        "G.I. Pipe",
        "C.S. Pipe",
        "G.M. Pipe",
        "S.S. 304",
        "S.S. 316"
      ]
    },
    {
      "category": "Industrial Valves",
      "items": [
        "Ball Valve",
        "Gate Valve",
        "Globe Valve",
        "Butterfly Valve",
        "NRV Valve",
        "S.S. 304 & 316",
        "M.S. S.C.S.I."
      ]
    },
    {
      "category": "Plastic Valves & Fittings",
      "items": [
        "P.P. Valve",
        "H.D.P.E. Valve",
        "PVC Valve"
      ]
    },
    {
      "category": "Threading Tools",
      "items": [
        "Top Set",
        "Round Set",
        "Rotary Cutter"
      ]
    },
    {
      "category": "Quality Hand Tools",
      "brands": ["Taparia", "Stanley"],
      "items": [
        "Ring / Fix Spanners",
        "Pipe Wrench",
        "Screw Driver",
        "Socket Set",
        "Nose Plier",
        "Wire Cutter"
      ]
    },
    {
      "category": "Cutting Tools",
      "brands": ["Addison", "Miranda"],
      "items": [
        "HSS Twist Drill & Tapper",
        "Extra Long Series Drill",
        "Side & Face Cutter",
        "Carbide Tipped Drill",
        "Endmill Cutter"
      ]
    },
    {
      "category": "Hydraulic Hoses",
      "items": [
        "S.S. Corrugated Hose",
        "Flexible Hose",
        "S.S. Flexible Teflon Hose",
        "Hydraulic Hose",
        "Expansion Bellows"
      ]
    },
    {
      "category": "SS / MS Fasteners",
      "items": [
        "Hex Head",
        "Allen Key",
        "Socket Head",
        "Nut & Washers",
        "CSK",
        "Grub Screw",
        "Spring Washers",
        "SS 304 & 316 Quality"
      ]
    },
    {
      "category": "Anchor Fasteners",
      "items": [
        "Foundation Fastener",
        "Pin Type Anchor Fastener",
        "Wedge Type Anchor Fastener",
        "Bullet Type Anchor Fastener",
        "All Types of Anchor Fasteners"
      ]
    },
    {
      "category": "Power Transmission Products",
      "brand": "Lovejoy",
      "items": [
        "L. Coupling",
        "Jaw Flex Coupling",
        "S.W. Coupling",
        "Pin Bush Coupling",
        "R.R.S. Coupling",
        "Rubber Spider"
      ]
    },
    {
      "category": "Pneumatic Products",
      "brands": ["Festo", "Janatics"],
      "items": [
        "Air Cylinders",
        "Spool Valves",
        "FR+L Units",
        "Airlines",
        "P.U. Fittings",
        "Solenoid Valves"
      ]
    },
    {
      "category": "Industrial Hoses",
      "brand": "Gates",
      "items": [
        "Chemical Hose",
        "Copper Braided Hose",
        "Steam Hose",
        "Petrol / CNG Hose"
      ]
    },
    {
      "category": "Jointing & Packing",
      "brands": ["Spitmaan", "Champion"],
      "items": [
        "Jointing Sheet",
        "Universal Rope",
        "Gland Packing",
        "Expanded PTFE",
        "Teflon Tape",
        "Gasket"
      ]
    },
    {
      "category": "Abrasives",
      "brand": "Norton",
      "items": [
        "Emery Cloth Paper",
        "Flap Wheel",
        "Grinding Wheel",
        "Cut-off Wheel"
      ]
    },
    {
      "category": "Power Tools",
      "brand": "Bosch",
      "items": [
        "Drill Machine",
        "Cutting Disc",
        "Flap Wheel",
        "Rotary Drill"
      ]
    },
    {
      "category": "Chains & Sprockets",
      "brands": ["Diamond", "Rolon"],
      "items": [
        "Simplex Roller Chain",
        "Duplex Chain",
        "Triplex Chain",
        "Chain Locks",
        "Chain Sprockets"
      ]
    },
    {
      "category": "Teflon Products",
      "items": [
        "Teflon Sheet",
        "Teflon Rods",
        "Teflon Gasket",
        "Teflon Tubes",
        "Glass Filled Bush",
        "Carbon Filled Teflon",
        "Teflon Bellows"
      ]
    },
    {
      "category": "Lubricants",
      "brands": ["Castrol", "Gulf", "Servo"],
      "items": [
        "All Types of Industrial Lubricants"
      ]
    },
    {
      "category": "Flanges",
      "items": [
        "M.S. Flanges",
        "S.S. Flanges",
        "Blind Flanges",
        "I.B.R. Flanges"
      ]
    },
    {
      "category": "Lifting Tools",
      "brand": "Indef",
      "items": [
        "Chain Pulley Block",
        "Wire Rope",
        "D-Shackles",
        "Electric Hoist"
      ]
    },
    {
      "category": "Welding Products",
      "brands": ["Mangalam", "Ador"],
      "items": [
        "Mild Steel Electrodes",
        "Stainless Steel Electrodes",
        "Cast Iron Electrodes"
      ]
    },
    {
      "category": "Safety Products",
      "items": [
        "Hand Gloves",
        "Boiler Suit",
        "Helmet",
        "Nose Mask",
        "Apron",
        "Safety Belt"
      ]
    },
    {
      "category": "Hose Clips",
      "items": [
        "M.S. Hose Clip",
        "S.S. Hose Clip"
      ]
    },
    {
      "category": "Gland Packing",
      "items": [
        "Asbestos Graphite Gland",
        "PTFE Impregnated Gland",
        "PTFE Flex-O-Seal Packing",
        "PTFE Universal Rope",
        "Teflon Tape",
        "Break Liner"
      ]
    },
    {
      "category": "Industrial Paint",
      "brands": ["Berger", "Asian Paints"],
      "items": [
        "All Types of Paint Products"
      ]
    },
    {
      "category": "Rubber Products",
      "items": [
        "Oil Seal",
        "Sheer Ring",
        "O-Ring Cord",
        "Neoprene",
        "Nitrile",
        "Silicon",
        "Viton EPDM",
        "NBM"
      ]
    },
    {
      "category": "Pressure Gauge",
      "items": [
        "Pressure Gauge",
        "Capsule Gauge",
        "Diaphragm Gauge",
        "Glycerin Gauge",
        "Temperature Gauge"
      ]
    },
    {
      "category": "Painting Tools",
      "brand": "Pilot",
      "items": [
        "Spray Painting Gun",
        "Air Blow Gun",
        "Electrical Spray",
        "Painting Gun"
      ]
    },
    {
      "category": "Industrial Brushes",
      "items": [
        "Paint Brushes",
        "Rollers",
        "Cup Brushes",
        "Wire Brushes",
        "Maintenance Brushes",
        "Twisted Knotted Brushes"
      ]
    },
    {
      "category": "Trolley Wheels",
      "items": [
        "Castors & Wheels (PP, PU, Fiber, Nylon, UHMW, Rubber, C.I.)"
      ]
    },
    {
      "category": "Cutting Wheels",
      "brand": "CUMI",
      "items": [
        "Grinding Wheel",
        "Flap Wheel",
        "Cut-off Wheel"
      ]
    },
    {
      "category": "Industrial Gas Equipment",
      "brand": "ESAB",
      "items": [
        "Regulators",
        "Nozzles",
        "Welding Electrodes",
        "Welding Items"
      ]
    },
    {
      "category": "Vices",
      "brand": "APEX",
      "items": [
        "Bench Vice",
        "Chain Vice",
        "Hand Vice",
        "Drill Vice",
        "Machine Vice",
        "Bearing Puller",
        "Pipe Vice"
      ]
    },
    {
      "category": "Water Hose",
      "items": [
        "Green Section Hose",
        "PVC Braided Hose",
        "PVC Transparent Hose"
      ]
    },
    {
      "category": "Precision Measuring Instruments",
      "brand": "Mitutoyo",
      "items": [
        "Vernier Calipers",
        "Depth Gauge",
        "Micro Meter",
        "Dial Gauge",
        "Height Gauge",
        "Filler Gauge",
        "Dial Indicators"
      ]
    },
    {
      "category": "Wire & Wire Mesh",
      "items": [
        "Wire Mesh",
        "Perforated Sheets",
        "S.S.",
        "M.S.",
        "G.I.",
        "Copper",
        "Aluminium"
      ]
    }
  ]
};

// Define schemas
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  productCount: { type: Number, default: 0 }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  brand: String,
  stock: { type: Number, default: 50 },
  image: String,
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function seedProducts() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kucha-enterprises';
    
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing categories and products...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create categories and products
    const categories = [];
    const products = [];

    for (const productGroup of productCatalog.products) {
      const categoryName = productGroup.category;
      
      // Create category
      const category = new Category({
        name: categoryName,
        description: `High-quality ${categoryName.toLowerCase()} for industrial applications`,
        status: 'active',
        productCount: productGroup.items.length
      });
      
      await category.save();
      categories.push(category);
      console.log(`✅ Created category: ${categoryName}`);

      // Get brands (handle both 'brand' and 'brands' fields)
      const brands = productGroup.brand 
        ? [productGroup.brand] 
        : (productGroup.brands || []);

      // Create products for this category
      for (const item of productGroup.items) {
        // If multiple brands, create a product for each brand, otherwise create one product
        if (brands.length > 0) {
          for (const brand of brands) {
            const product = new Product({
              name: `${item}${brands.length > 1 ? ` (${brand})` : ''}`,
              description: `${item} - Premium quality ${categoryName.toLowerCase()}${brand ? ` from ${brand}` : ''}`,
              category: categoryName,
              brand: brand,
              stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10-110
              status: 'active',
              featured: Math.random() > 0.8 // 20% chance of being featured
            });
            products.push(product);
          }
        } else {
          const product = new Product({
            name: item,
            description: `${item} - Premium quality ${categoryName.toLowerCase()}`,
            category: categoryName,
            stock: Math.floor(Math.random() * 100) + 10,
            status: 'active',
            featured: Math.random() > 0.8
          });
          products.push(product);
        }
      }
    }

    // Insert all products
    console.log(`📦 Creating ${products.length} products...`);
    await Product.insertMany(products);
    console.log(`✅ Created ${products.length} products`);

    console.log('\n📊 Summary:');
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Products: ${products.length}`);
    console.log('\n✅ Seed completed successfully!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedProducts();

