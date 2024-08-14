import mongoose from "mongoose"

const order = new mongoose.Schema({
    userId: {type: String, required: true},
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    address: {type: String, required: true},
    status: {type: String, default: "Confirmed"},
    date: {type: Date, default: Date.now()},
    payment:{type: Boolean, default: false}
})

const orderModel = mongoose.model("order", order)
export default orderModel