import express from "express"
import {  } from "../controllers/user.js"
import { login, signup } from "../controllers/user.js"

const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/signup", signup)

export default userRouter