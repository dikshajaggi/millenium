import jwt from "jsonwebtoken"
import { auth } from "express-oauth2-jwt-bearer";
import "dotenv/config"

// const authMiddleware = async(req, res, next) => {
//     console.log(req.headers, "headers check auth")
//     const {token} = req.headers
//     if(!token) {
//         return res.json({success: false, message: "not authorized"})
//     }
//     try{
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userid = token_decode.id 
//         next()
//     }catch(error){
//         console.log(error, "error check")
//         return res.json({success: false, message: "error"})
//     }
// }

const authMiddleware = (req, res, next) => {
    auth({
        audience: process.env.AUTH0_AUDIENCE,
        issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
        tokenSigningAlg: "RS256",
    })(req, res, (err) => {
        if (err) {
            req.user = null; // Allow request to proceed without authentication
        }
        next();
    });
};

export default authMiddleware