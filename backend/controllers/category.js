import productModel from "../models/product.js"

export const getProducts = async(req, res) => {
    const { categoryName } = req.params;
    console.log(categoryName, req.params, "category name")
    try {
        const products = await productModel.find({ category: categoryName });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}