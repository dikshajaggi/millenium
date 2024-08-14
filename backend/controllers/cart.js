import userModel from "../models/user.js"

export const addToCart = async(req, res) => {
    try{
        // req.body.userid -> we are getting this from the authMiddleware
        const userData = await userModel.findOne({_id: req.body.userid})
        console.log(req.body.userid, userData, "req.body.userid")

        let cartData = await userData.cartData
        if (!cartData[req.body.itemid])cartData[req.body.itemid] = 1
        else cartData[req.body.itemid] += 1
        await userModel.findByIdAndUpdate(req.body.userid, {cartData})
        return res.json({success: true, message: "item added to cart"})
    } catch(error){
        console.log(error, "error check")
        return res.json({success: false, message: "error"})
    }
   
}

export const removeFromCart = async(req, res) => {
    try{
        const userData = await userModel.findOne({_id: req.body.userid})
        let cartData = await userData.cartData
        if (cartData[req.body.itemid] > 0)cartData[req.body.itemid] -= 1
        await userModel.findByIdAndUpdate(req.body.userid, {cartData})
        return res.json({success: true, message: "item removed from cart"})
    }catch(error){
        console.log(error, "error check")
        return res.json({success: false, message: "error"})
    }
}

export const getCart = async (req, res) => {
    try{
        const userData = await userModel.findOne({_id: req.body.userid})
        const cartData = await userData.cartData
        return res.json({success: true, cartData})
    }catch(error){
        console.log(error, "error check")
        return res.json({success: false, message: "error"})
    }
}