import express from "express"
import { searchAll, searchCategoryWise } from "../controllers/search.js"

const searchRouter = express.Router()

searchRouter.get("/all", searchAll)
searchRouter.get("/category", searchCategoryWise)

export default searchRouter