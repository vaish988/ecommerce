const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
require('dotenv').config();

// Middleware to verify JWT token


// Middleware to verify the JWT token
// In auth.js (middleware)
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user information to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}

module.exports = { verifyToken };


module.exports = { verifyToken };


// Middleware to check if the user is an Admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user || user.role !== 'Admin') {
            return res.status(403).json({ message: "Admin role required for this action!" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Middleware to check if the user is a Vendor
const isVendor = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user || user.role !== 'Vendor') {
            return res.status(403).json({ message: "Vendor role required for this action!" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Middleware to check if the user is a Customer
const isCustomer = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user || user.role !== 'Customer') {
            return res.status(403).json({ message: "Customer role required for this action!" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Middleware to validate product details for adding/updating a product
const validateProduct = (req, res, next) => {
    const { name, description, price, quantityInStock, category } = req.body;
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Product name, price, and category are required' });
    }
    if (price <= 0) {
        return res.status(400).json({ message: 'Product price must be greater than zero' });
    }
    if (quantityInStock < 0) {
        return res.status(400).json({ message: 'Product quantity cannot be negative' });
    }
    next(); // Proceed to the next middleware or route handler
};

// Middleware to validate cart item details for adding/updating a cart item
const validateCartItem = async (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
    if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    next(); // Proceed to the next middleware or route handler
};

// Middleware to check if the cart belongs to the authenticated user
const isUserCart = async (req, res, next) => {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'This cart does not belong to the authenticated user' });
    }
    next(); // Proceed to the next middleware or route handler
};

module.exports = {
    verifyToken,
    isAdmin,
    isVendor,
    isCustomer,
    validateProduct,
    validateCartItem,
    isUserCart
};
