import express from "express"
import { login, signup, requestOtp, verifyOtp  } from "../controllers/user.js"

const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.post("/verify-otp", verifyOtp)
userRouter.post("/request-otp", requestOtp)


export default userRouter