import CheckoutModel from "../models/checkout.model.js";
// routes/cart.routes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';


const router = express.Router();

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }

    try {
        const decoded = jwt.verify(token, 'QiOjE3MDE2OTk0MzMsImV4cCI6MTcwMTcwMzAzM30.1sR1U6uNDE0cGB7Pb-Di-nBeiRgpMN3Jog4aduTlY4o');
        console.log('Decoded Token: ---------', decoded);
        req.user = decoded; // Attach user information to the request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden - Invalid Token' });
    }
};

router.post('/checkout', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract checkout details from the request body
        const { userName, phoneNumber, address, street, city, state, country, paymentMethod } = req.body;

        // Create a new checkout entry
        const checkoutEntry = new CheckoutModel({
            user: userId,
            userName,
            phoneNumber,
            address,
            street,
            city,
            state,
            country,
            paymentMethod,
            cart: user.cart,
        });

        // Save the checkout entry
        await checkoutEntry.save();

        res.status(200).json({ message: 'Checkout details stored successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;