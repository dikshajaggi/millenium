import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
    userName: String,
    phoneNumber: String,
    address: String,
    street: String,
    city: String,
    state: String,
    country: String,
    paymentMethod: String,
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
            },
            quantity: Number,
            productName: String
        }
    ],
});

const CheckoutModel = mongoose.model('Checkout', checkoutSchema);

export default CheckoutModel;
