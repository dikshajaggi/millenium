import express from "express"
import { getProducts } from "../controllers/category.js"

const categoryRouter = express.Router()

categoryRouter.get("/all", getProducts)


export default categoryRouter