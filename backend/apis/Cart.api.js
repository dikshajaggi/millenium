// routes/cart.routes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import Product from '../models/product.models.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        console.log('Decoded Token:', decoded);
        req.user = decoded; // Attach user information to the request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden - Invalid Token' });
    }
};

// api to add products to cart
router.post('/add-to-cart', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product exists
        const productId = req.body.productId;
        const quantity = req.body.quantity || 1; // Default to 1 if quantity is not provided

        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log(product, "product check", user)

        // Check if the product is already in the user's cart
        const existingProductIndex = user.cart.findIndex(item => item.product === product._id);

        if (existingProductIndex !== -1) {
            // If the product is already in the cart, update the quantity
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            // If the product is not in the cart, add it with the specified quantity
            user.cart.push({
                product: product._id,
                quantity,
                productName: product.name,
                price: product.price
            });
        }

        await user.save();

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Route to get all cart products for a user
router.get('/all-products', authenticateUser, async (req, res) => {
    try {
        const userId = req.user ? req.user.userId : undefined;

        // Check if the user exists
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: { path: 'product', model: 'Product' }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract cart products from the user
        const cartProducts = user.cart.map(cartItem => ({
            product: cartItem.product,
            quantity: cartItem.quantity
        }));

        res.status(200).json({ cartProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Route to delete a product from the user's cart
router.delete('/delete-from-cart/:productId', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product exists
        const productId = req.params.productId;

        // Convert productId to a Buffer for comparison
        const productToRemove = Buffer.from(productId, 'hex');
        console.log(productToRemove, "rmeoving---")
        const productIndex = user.cart.findIndex(item => Buffer.compare(item.product.id, productToRemove) === 0);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Remove the product from the user's cart
        user.cart.splice(productIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to fetch the quantity of a product from the user's cart
router.get('/product-quantity/:productId', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(user.cart, "CHECKING USER'S CART-----------------------")
        // Find the product in the user's cart
        const cartItem = user.cart.find(item => item.product._id == productId);
        console.log(cartItem, "CHECKING USER'S CART- cartItem----------------------")


        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Respond with the quantity of the product in the cart
        res.status(200).json({ quantity: cartItem.quantity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Route to update the quantity of a product in the user's cart
router.patch('/update-cart/:productId', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;
        const newQuantity = req.body.quantity; // New quantity to be updated

        // Check if the user exists
        const user = await User.findById(userId).populate('cart.product');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the product in the user's cart
        const cartItem = user.cart.find(item => item?.product?.id === productId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Ensure the new quantity is a valid number
        if (isNaN(newQuantity) || !Number.isInteger(newQuantity) || newQuantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Update the quantity of the product in the cart
        cartItem.quantity = newQuantity;

        // If the quantity becomes 1, ensure the item is in the cart
        if (newQuantity === 1 && !user.cart.some(item => item.product.id === productId)) {
            user.cart.push({ product: cartItem.product, quantity: 1 });
        }

        await user.save();

        res.status(200).json({ message: 'Cart updated successfully', updatedCart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Route to clear all products from the user's cart
router.delete('/clear-cart', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clear all products from the user's cart
        user.cart = [];
        await user.save();

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
