import orderModel from "../models/order.js";
import userModel from "../models/user.js";

export const placeOrder = async(req, res) => {
    const {userid, items, amount, address} = req.body
    try{
        const order = new orderModel({
            userid,
            items,
            amount,
            address,
        })

        await order.save()
        await userModel.findByIdAndUpdate(userid, {cartData: {}})
        return res.json({success: true, message:"order placed successfully"})
    }catch(error){
        console.log(error)
        return res.json({success: false, message:"error"})
    }
}

