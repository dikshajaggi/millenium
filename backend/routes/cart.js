import express from "express"
import { addToCart, getCart, removeFromCart } from "../controllers/cart.js"

const cartRouter = express.Router()

cartRouter.post("/add", addToCart)
cartRouter.post("/remove", removeFromCart)
cartRouter.get("/all", getCart)

export default cartRouter