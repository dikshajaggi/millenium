import express from "express"
import { login, signup, requestOtp, verifyOtp, verifyResetOtp, resetPassword } from "../controllers/user.js"

const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.post("/verify-otp", verifyOtp)
userRouter.post("/request-otp", requestOtp)
userRouter.post("/reset-pass", resetPassword)
userRouter.post("/verify-reset-otp", verifyResetOtp)


export default userRouter