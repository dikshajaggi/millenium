import CartModel from "../models/cart.js";
import userModel from "../models/user.js"

export const addToCart = async (req, res) => {
    try {
        console.log(req.body, req.auth, 'request body-----------');
        
        const userId = req.auth.payload.sub; // Get Auth0 User ID
        const { itemid } = req.body; 

        // Find user's cart or create a new one
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({ userId, cartData: {} });
        }

        // Update cart data
        let cartData = cart.cartData;
        cartData[itemid] = (cartData[itemid] || 0) + 1;

        // Save to DB
        cart.cartData = cartData;
        await cart.save();

        return res.json({ success: true, message: "Item added to cart", cartData });
    } catch (error) {
        console.log(error, "error check");
        return res.status(500).json({ success: false, message: "Error adding item to cart" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.auth.payload.sub; // Get Auth0 User ID
        const { itemid } = req.body;

        let cart = await CartModel.findOne({ userId });
        if (!cart) return res.json({ success: false, message: "Cart not found" });

        let cartData = cart.cartData;
        if (cartData[itemid] > 0) {
            cartData[itemid] -= 1;
            if (cartData[itemid] === 0) {
                delete cartData[itemid]; // Remove item if count is 0
            }
        }

        // Save the updated cart
        cart.cartData = cartData;
        await cart.save();

        return res.json({ success: true, message: "Item removed from cart", cartData });
    } catch (error) {
        console.log(error, "error check");
        return res.status(500).json({ success: false, message: "Error removing item from cart" });
    }
};


export const getCart = async (req, res) => {
    try {
        const userId = req.auth.payload.sub; // Get Auth0 User ID

        let cart = await CartModel.findOne({ userId });
        if (!cart) return res.json({ success: true, cartData: {} });

        return res.json({ success: true, cartData: cart.cartData });
    } catch (error) {
        console.log(error, "error check");
        return res.status(500).json({ success: false, message: "Error retrieving cart" });
    }
};