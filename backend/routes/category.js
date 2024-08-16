import express from "express"
import { getProducts } from "../controllers/category.js"

const categoryRouter = express.Router()

categoryRouter.get("/:categoryName", getProducts)


export default categoryRouter