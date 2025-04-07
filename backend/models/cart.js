import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Auth0's `sub` ID
    cartData: { type: Object, default: {} } // Storing item IDs as key-value pairs
});

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
