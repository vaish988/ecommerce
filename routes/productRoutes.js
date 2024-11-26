const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isVendor, validateProduct } = require('../middleware/auth');
const Product = require('../models/product');

// Create Product (Vendor or Admin only)
router.post('/products', verifyToken, isVendor, validateProduct, async (req, res) => {
    try {
        const { name, description, price, quantityInStock, category } = req.body;
        const product = new Product({ name, description, price, quantityInStock, category });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Single Product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Product (Vendor or Admin only)
router.put('/products/:id', verifyToken, isVendor, validateProduct, async (req, res) => {
    try {
        const { name, description, price, quantityInStock, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, quantityInStock, category },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Product (Vendor or Admin only)
router.delete('/products/:id', verifyToken, isVendor, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
