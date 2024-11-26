const express = require('express');
const router = express.Router();
const { verifyToken, isCustomer, validateCartItem, isUserCart } = require('../middleware/auth');
const Cart = require('../models/cart');
const Product = require('../models/product');

// Create or Update Cart Item (Customer only)
router.post('/cart', verifyToken, isCustomer, validateCartItem, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                res.status(200).json({ message: 'Cart updated successfully', cart });
            } else {
                cart.products.push({ productId, quantity });
                await cart.save();
                res.status(200).json({ message: 'Product added to cart', cart });
            }
        } else {
            const newCart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
            await newCart.save();
            res.status(201).json({ message: 'Cart created successfully', cart: newCart });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User's Cart (Customer only)
router.get('/cart/:cartId', verifyToken, isCustomer, isUserCart, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Cart Item (Customer only)
router.delete('/cart/:cartId/item/:itemId', verifyToken, isCustomer, isUserCart, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.products.findIndex((item) => item._id.toString() === req.params.itemId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        cart.products.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
