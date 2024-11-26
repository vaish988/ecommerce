// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');  // Import user routes
const productRoutes = require('./routes/productRoutes');  // Import product routes
const cartRoutes = require('./routes/cartRoutes'); 
const protectedRoutes=require('./routes/protectedroute') // Import cart routes
const { verifyToken } = require('./middleware/auth');  // JWT verification middleware

dotenv.config();  // Load environment variables

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());  // Parse JSON request bodies

// Public Routes
app.use('/api/users', userRoutes);  // User routes for registration, login, etc.
app.use('/api/products', productRoutes);  // Product routes for CRUD operations
app.use('/api/cart', verifyToken, cartRoutes);  // Cart routes (protected)
app.use('/api/protected', protectedRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
