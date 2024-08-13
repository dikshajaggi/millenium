import productModel from "../models/product.js"
import fs from "fs"

export const addProduct = async(req, res) => {
    let image_filename = `${req.file.filename}`
    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        image: image_filename
    })  
    try {
        await product.save()
        res.json({success: true, message: "product added"})
    } catch (error) {
        console.log(error, "error check")
        res.json({success: false, message: "error"})
    }
}

export const getProducts = async (req, res) => {
    try{
        const products = await productModel.find({})
        res.json({success: true, data: products})
    } catch(error){
        console.log(error, "error check")
        res.json({success: false, message: "error"})
    }
}

export const removeProduct = async(req, res) => {
    try {
        const product = await productModel.findById(req.body.id)
        fs.unlink(`uploads/${product.image}`, () => {})
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "product removed"})
    } catch (error) {
        console.log(error, "error check")
        res.json({success: false, message: "error"})
    }
}
