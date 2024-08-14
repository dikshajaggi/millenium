import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { placeOrder } from "../controllers/order.js"

const orderRouter = express.Router()

orderRouter.post("/place-order", authMiddleware, placeOrder)


export default orderRouter