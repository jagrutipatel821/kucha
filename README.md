# Kucha Enterprises - Business Solutions Platform

A modern, full-stack web application built with Next.js, MongoDB, and Tailwind CSS for managing business products and services.

## Features

- **User Authentication**: Separate login systems for users and administrators
- **Admin Dashboard**: Complete product and category management
- **Product Catalog**: Browse and filter products by category
- **Shopping Cart**: Add products to cart with localStorage persistence
- **Admin Registration Key**: Secure admin registration with key validation
- **Database Integration**: MongoDB with Mongoose for data persistence
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **State Management**: React hooks (useState, useEffect)

## Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kucha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/kucha-enterprises
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ADMIN_REGISTRATION_KEY=kucha-admin-2024-secure-key
   ```

4. **Start MongoDB**
   - Local: Make sure MongoDB is running on your system
   - Atlas: Update the MONGODB_URI with your Atlas connection string

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

After seeding the database, you can use these demo accounts:

### Admin Account
- **Email**: admin@kucha.com
- **Password**: admin123
- **Registration Key**: ADMIN123

### User Account
- **Email**: user@kucha.com
- **Password**: user123

## Project Structure

```
kucha/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product management
│   │   └── categories/    # Category management
│   ├── admin/             # Admin dashboard
│   │   ├── components/    # Admin-specific components
│   │   ├── dashboard/     # Admin dashboard pages
│   │   └── types.ts       # TypeScript interfaces
│   ├── components/        # Shared components
│   ├── user/              # User dashboard
│   └── ...                # Other pages
├── lib/                   # Utility functions
│   └── mongodb.ts         # Database connection
├── models/                # Mongoose models
│   ├── User.ts           # User model
│   ├── Product.ts        # Product model
│   └── Category.ts       # Category model
├── scripts/              # Database scripts
│   └── seed.js          # Database seeding script
└── ...                   # Configuration files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `GET /api/categories/[id]` - Get single category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

## Key Features Explained

### Admin Registration Key System
- Admins must provide a valid registration key during signup
- The key is validated server-side for security
- Default key is `ADMIN123` (change in production)

### Product Management
- Admins can add, edit, delete, and manage product status
- Products can be marked as featured
- Stock tracking and category assignment
- Image upload support (base64 encoding)

### Category Management
- Dynamic category creation and management
- Automatic product count tracking
- Category-based product filtering

### Real-time Updates
- Products page automatically updates when new products are added
- Admin dashboard reflects changes immediately
- Cart persistence using localStorage

## Development

### Running Tests
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

### Database Operations
```bash
# Seed database with demo data
npm run seed

# Clear database (manual MongoDB operation)
# Connect to MongoDB and drop collections
```

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens for session management
- Admin registration key validation
- Input validation on all API endpoints
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.