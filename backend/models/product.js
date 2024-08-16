import mongoose from "mongoose"

const product = new mongoose.Schema({
    name: {type: String, required: true},
    name_id: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true},
    image: {type: String, required: true}
})

const productModel = mongoose.model("product", product)
export default productModel