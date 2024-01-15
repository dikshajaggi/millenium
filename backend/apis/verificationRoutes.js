import express from 'express'
import twilio from "twilio"
import User from '../models/user.models.js'
import jwt from 'jsonwebtoken';
import CheckoutModel from "../models/checkout.model.js"

const router = express.Router()

// Initialize the Twilio client with your credentials
const accountSid = 'AC7e56caff5114ee8d280dbf67f6cc976f';
const authToken = '28b38d7b19eed595b5476d5a6569184c';
const client = twilio(accountSid, authToken);


// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token, "token")

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }

    try {
        const decoded = jwt.verify(token, 'QiOjE3MDE2OTk0MzMsImV4cCI6MTcwMTcwMzAzM30.1sR1U6uNDE0cGB7Pb-Di-nBeiRgpMN3Jog4aduTlY4o');
        console.log('Decoded Token', decoded, token);
        req.user = decoded; // Attach user information to the request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden - Invalid Token' });
    }
};

router.post('/send-order-details', authenticateUser, async (req, res) => {
    const userId = req.user.userId; // Assuming you have authentication middleware
    const phoneNumber = req.body.phoneNumber;
    const phoneNumberWithCountryCode = "+91" + phoneNumber;


    try {
        // Find the user based on the user ID (you can adjust this based on your authentication mechanism)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user, "user found")

        // Fetch the user's cart details and total price
        const checkoutDetails = await CheckoutModel.findOne({ user: user._id });

        if (!checkoutDetails) {
            return res.status(404).json({ error: 'Checkout details not found' });
        }

        // You may need to adjust this based on your actual data structure
        // const cartProducts = checkoutDetails.cart.map(item => ({
        //     productName: item.product.name,
        //     quantity: item.quantity,
        // }));

        // console.log("cartproducts", cartProducts)

        // const totalPrice = checkoutDetails.totalPrice; // Adjust this based on your data structure

        // Compose the message with order details
        // const messageBody = `Thank you for your order!\n\nOrder Details:\n${formatCartDetails(cartProducts)}\nTotal Price: ${totalPrice}`;
        const messageBody = "Thank you for your order!Order"

        // Use Twilio (or your preferred SMS service) to send the order details
        await client.messages.create({
            body: messageBody,
            to: phoneNumberWithCountryCode,
            from: '+12568010504', // Replace with your Twilio phone number
        });

        res.status(200).json({ message: 'Order details sent successfully' });
    } catch (error) {
        console.error('Error sending order details:', error);
        res.status(500).json({ error: 'Failed to send order details' });
    }
});

// Helper function to format cart details
function formatCartDetails(cartProducts) {
    return cartProducts.map(product => `${product.quantity} x ${product.productName}`).join('\n');
}

export default router