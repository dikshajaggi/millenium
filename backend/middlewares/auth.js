import jwt from "jsonwebtoken"

const authMiddleware = async(req, res, next) => {
    console.log(req.headers, "headers check auth")
    const {token} = req.headers
    if(!token) {
        return res.json({success: false, message: "not authorized"})
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userid = token_decode.id 
        next()
    }catch(error){
        console.log(error, "error check")
        return res.json({success: false, message: "error"})
    }
}

export default authMiddleware