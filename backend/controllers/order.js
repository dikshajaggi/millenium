import orderModel from "../models/order.js";
import userModel from "../models/user.js";

export const placeOrder = async(req, res) => {
    const {userId, items, amount, address} = req.body
    try{
        const order = new orderModel({
            userId,
            items,
            amount,
            address,
        })

        await order.save()
        await userModel.findByIdAndUpdate(userId, {cartData: {}})
        return res.json({success: false, message:"order placed successfully"})
    }catch(error){
        console.log(error)
        return res.json({success: false, message:"error"})
    }
}

