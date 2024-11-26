// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');  
const productRoutes = require('./routes/productRoutes');  
const cartRoutes = require('./routes/cartRoutes'); 
const protectedRoutes=require('./routes/protectedroute')
const { verifyToken } = require('./middleware/auth'); 

dotenv.config();  

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


app.use(express.json()); 

// Public Routes
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes);  
app.use('/api/cart', verifyToken, cartRoutes);  
app.use('/api/protected', protectedRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
