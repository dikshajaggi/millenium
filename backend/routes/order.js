import express from "express"
import { placeOrder } from "../controllers/order.js"
import authMiddleware from "../middlewares/auth.js"

const orderRouter = express.Router()

orderRouter.post("/place-order", authMiddleware, placeOrder)


export default orderRouter