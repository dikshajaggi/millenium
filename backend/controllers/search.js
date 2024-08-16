import productModel from "../models/product.js";

export const searchAll = async(req, res) => {
    const {productName} = req.query
    // using query params for flexibility
    try {
        // case-insensitive search for products that match the partial name
        const products = await productModel.find({ 
            name: { $regex: productName, $options: "i" }  // 'i' for case-insensitive matching
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const searchCategoryWise = async(req, res) => {
    const { productName, category } = req.query;

    try {
        // Search for products by both name and category
        const products = await productModel.find({ 
            name: { $regex: productName, $options: "i" }, 
            category 
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}